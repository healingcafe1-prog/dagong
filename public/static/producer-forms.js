// ===== 상품 등록/수정 폼 =====
async function loadProductFormPage(producerId, productId) {
  try {
    const [producerRes, categoriesRes] = await Promise.all([
      axios.get(`/api/producers/${producerId}`),
      axios.get('/api/categories')
    ]);
    
    const producer = producerRes.data;
    const categories = categoriesRes.data.categories;
    
    let product = null;
    if (productId) {
      const productRes = await axios.get(`/api/products/${productId}`);
      product = productRes.data;
    }
    
    const isEdit = !!product;
    
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8 max-w-3xl">
        <div class="bg-white rounded-lg shadow-md p-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-6">
            <i class="fas fa-${isEdit ? 'edit' : 'plus-circle'} text-tea-green mr-2"></i>
            ${isEdit ? '상품 수정' : '상품 등록'}
          </h1>
          
          <form id="productForm" class="space-y-6">
            <!-- 기본 정보 -->
            <div class="border-b pb-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">기본 정보</h2>
              
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">상품명 *</label>
                <input type="text" id="productName" required
                       class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
                       placeholder="예: 제주 유기농 첫물차" value="${product?.name || ''}">
              </div>
              
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">카테고리 *</label>
                <select id="categoryId" required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green">
                  <option value="">카테고리 선택</option>
                  ${categories.map(cat => `
                    <option value="${cat.id}" ${product?.category_id === cat.id ? 'selected' : ''}>
                      ${cat.name}
                    </option>
                  `).join('')}
                </select>
              </div>
              
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">상품 설명 *</label>
                <textarea id="productDescription" rows="4" required
                          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
                          placeholder="상품에 대한 자세한 설명을 입력하세요">${product?.description || ''}</textarea>
              </div>
            </div>
            
            <!-- 가격 정보 -->
            <div class="border-b pb-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">가격 정보</h2>
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p class="text-sm text-blue-800">
                  <i class="fas fa-info-circle mr-2"></i>
                  <strong>직거래 할인 안내:</strong> 기본 30% 할인이 적용됩니다. 
                  정가를 입력하면 할인가가 자동으로 계산됩니다.
                </p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label class="block text-gray-700 font-bold mb-2">정가 *</label>
                  <input type="number" id="originalPrice" required min="0" step="1000"
                         class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
                         placeholder="50000" value="${product?.original_price || ''}"
                         onchange="calculatePrice()">
                  <p class="text-xs text-gray-500 mt-1">원</p>
                </div>
                
                <div>
                  <label class="block text-gray-700 font-bold mb-2">할인율 *</label>
                  <input type="number" id="discountRate" required min="0" max="100"
                         class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
                         placeholder="30" value="${product?.discount_rate || 30}"
                         onchange="calculatePrice()">
                  <p class="text-xs text-gray-500 mt-1">%</p>
                </div>
                
                <div>
                  <label class="block text-gray-700 font-bold mb-2">판매가</label>
                  <input type="number" id="price" readonly
                         class="w-full px-4 py-2 border rounded-lg bg-gray-100"
                         value="${product?.price || ''}">
                  <p class="text-xs text-gray-500 mt-1">자동 계산</p>
                </div>
                
                <div>
                  <label class="block text-gray-700 font-bold mb-2">배송비 *</label>
                  <input type="number" id="shippingFee" required min="3000" max="5000" step="500"
                         class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
                         placeholder="3000" value="${product?.shipping_fee || 3000}">
                  <p class="text-xs text-gray-500 mt-1">3,000 ~ 5,000원</p>
                </div>
              </div>
              
              <div id="pricePreview" class="bg-green-50 border border-green-200 rounded-lg p-4 hidden">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <div>
                      <span class="text-gray-600 line-through text-lg" id="previewOriginal"></span>
                      <span class="ml-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold" id="previewDiscount"></span>
                    </div>
                    <div class="text-2xl font-bold text-tea-green" id="previewPrice"></div>
                  </div>
                  <div class="pt-2 border-t border-green-300">
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">플랫폼 수수료 (9.9%)</span>
                      <span class="text-gray-800" id="previewCommission"></span>
                    </div>
                    <div class="flex justify-between text-sm font-bold mt-1">
                      <span class="text-gray-800">생산자 수익</span>
                      <span class="text-tea-green" id="previewRevenue"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 재고 및 상세 정보 -->
            <div class="border-b pb-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">재고 및 상세 정보</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-gray-700 font-bold mb-2">재고 수량 *</label>
                  <input type="number" id="stockQuantity" required min="0"
                         class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
                         placeholder="100" value="${product?.stock_quantity || ''}">
                </div>
                
                <div>
                  <label class="block text-gray-700 font-bold mb-2">중량/용량</label>
                  <input type="text" id="weight"
                         class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
                         placeholder="예: 100g, 500ml" value="${product?.weight || ''}">
                </div>
              </div>
              
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">원산지 *</label>
                <input type="text" id="origin" required
                       class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
                       placeholder="예: 제주도" value="${product?.origin || ''}">
              </div>
              
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">상품 타입</label>
                <select id="productType"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green">
                  <option value="single" ${product?.product_type === 'single' ? 'selected' : ''}>단품</option>
                  <option value="gift_set" ${product?.product_type === 'gift_set' ? 'selected' : ''}>선물세트</option>
                </select>
              </div>
              
              <div class="flex items-center">
                <input type="checkbox" id="isFeatured" ${product?.is_featured ? 'checked' : ''}
                       class="w-4 h-4 text-tea-green border-gray-300 rounded focus:ring-tea-green">
                <label for="isFeatured" class="ml-2 text-gray-700">추천 상품으로 표시</label>
              </div>
            </div>
            
            <!-- 이미지 -->
            <div class="mb-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">상품 이미지</h2>
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">이미지 URL</label>
                <input type="text" id="mainImage"
                       class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
                       placeholder="/images/products/product.jpg" value="${product?.main_image || ''}">
                <p class="text-xs text-gray-500 mt-1">
                  이미지 URL을 입력하세요. 비워두면 기본 이미지가 사용됩니다.
                </p>
              </div>
            </div>
            
            <!-- 버튼 -->
            <div class="flex gap-4">
              <button type="submit" 
                      class="flex-1 bg-tea-green text-white py-3 px-6 rounded-lg font-bold hover:bg-opacity-90 transition">
                <i class="fas fa-save mr-2"></i>${isEdit ? '수정 완료' : '등록하기'}
              </button>
              <a href="/producer/manage/${producerId}" 
                 class="bg-gray-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-600 transition">
                취소
              </a>
            </div>
          </form>
        </div>
      </div>
    `;
    
    // 가격 계산 함수
    window.calculatePrice = function() {
      const originalPrice = parseInt(document.getElementById('originalPrice').value) || 0;
      const discountRate = parseInt(document.getElementById('discountRate').value) || 0;
      const commissionRate = 9.9; // 플랫폼 수수료율
      
      if (originalPrice > 0) {
        const price = Math.round(originalPrice * (1 - discountRate / 100));
        const commissionAmount = Math.round(price * (commissionRate / 100));
        const producerRevenue = price - commissionAmount;
        
        document.getElementById('price').value = price;
        
        // 미리보기 업데이트
        const preview = document.getElementById('pricePreview');
        preview.classList.remove('hidden');
        document.getElementById('previewOriginal').textContent = formatPrice(originalPrice);
        document.getElementById('previewDiscount').textContent = discountRate + '% 할인';
        document.getElementById('previewPrice').textContent = formatPrice(price);
        document.getElementById('previewCommission').textContent = formatPrice(commissionAmount);
        document.getElementById('previewRevenue').textContent = formatPrice(producerRevenue);
      }
    };
    
    // 초기 가격 계산
    if (product) {
      calculatePrice();
    }
    
    // 폼 제출 처리
    document.getElementById('productForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('productName').value,
        category_id: parseInt(document.getElementById('categoryId').value),
        producer_id: parseInt(producerId),
        description: document.getElementById('productDescription').value,
        original_price: parseInt(document.getElementById('originalPrice').value),
        price: parseInt(document.getElementById('price').value),
        discount_rate: parseInt(document.getElementById('discountRate').value),
        shipping_fee: parseInt(document.getElementById('shippingFee').value),
        stock_quantity: parseInt(document.getElementById('stockQuantity').value),
        weight: document.getElementById('weight').value,
        origin: document.getElementById('origin').value,
        product_type: document.getElementById('productType').value,
        main_image: document.getElementById('mainImage').value || '/images/products/default.jpg',
        is_featured: document.getElementById('isFeatured').checked
      };
      
      try {
        if (isEdit) {
          await axios.put(`/api/products/${productId}`, formData);
          alert('상품이 수정되었습니다!');
        } else {
          await axios.post('/api/products', formData);
          alert('상품이 등록되었습니다!');
        }
        window.location.href = `/producer/manage/${producerId}`;
      } catch (error) {
        console.error('상품 저장 오류:', error);
        alert('상품 저장 중 오류가 발생했습니다.');
      }
    });
    
  } catch (error) {
    console.error('상품 폼 로드 오류:', error);
    app.innerHTML = '<div class="container mx-auto px-4 py-20 text-center"><p class="text-red-500">페이지를 불러오는 중 오류가 발생했습니다.</p></div>';
  }
}

// ===== 체험 등록/수정 폼 =====
async function loadExperienceFormPage(producerId, experienceId) {
  try {
    const [producerRes, regionsRes] = await Promise.all([
      axios.get(`/api/producers/${producerId}`),
      axios.get('/api/regions')
    ]);
    
    const producer = producerRes.data;
    const regions = regionsRes.data.regions;
    
    let experience = null;
    if (experienceId) {
      const expRes = await axios.get(`/api/experiences/${experienceId}`);
      experience = expRes.data.experience;
    }
    
    const isEdit = !!experience;
    
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8 max-w-3xl">
        <div class="bg-white rounded-lg shadow-md p-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-6">
            <i class="fas fa-${isEdit ? 'edit' : 'plus-circle'} text-craft-blue mr-2"></i>
            ${isEdit ? '체험 수정' : '체험 등록'}
          </h1>
          
          <form id="experienceForm" class="space-y-6">
            <!-- 기본 정보 -->
            <div class="border-b pb-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">기본 정보</h2>
              
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">체험명 *</label>
                <input type="text" id="experienceName" required
                       class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-craft-blue"
                       placeholder="예: 전통 다도교육 체험" value="${experience?.name || ''}">
              </div>
              
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">지역 *</label>
                <select id="regionId" required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-craft-blue">
                  <option value="">지역 선택</option>
                  ${regions.map(region => `
                    <option value="${region.id}" ${experience?.region_id === region.id ? 'selected' : ''}>
                      ${region.name}
                    </option>
                  `).join('')}
                </select>
              </div>
              
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">체험 유형 *</label>
                <select id="experienceType" required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-craft-blue">
                  <option value="">유형 선택</option>
                  <option value="tea_ceremony" ${experience?.type === 'tea_ceremony' ? 'selected' : ''}>다도교육</option>
                  <option value="tea_tasting" ${experience?.type === 'tea_tasting' ? 'selected' : ''}>차 시음</option>
                  <option value="craft_workshop" ${experience?.type === 'craft_workshop' ? 'selected' : ''}>공예 체험</option>
                  <option value="farm_tour" ${experience?.type === 'farm_tour' ? 'selected' : ''}>농장 투어</option>
                  <option value="workshop_visit" ${experience?.type === 'workshop_visit' ? 'selected' : ''}>공방 견학</option>
                </select>
              </div>
              
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">체험 설명 *</label>
                <textarea id="experienceDescription" rows="4" required
                          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-craft-blue"
                          placeholder="체험에 대한 자세한 설명을 입력하세요">${experience?.description || ''}</textarea>
              </div>
            </div>
            
            <!-- 가격 정보 -->
            <div class="border-b pb-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">가격 정보</h2>
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p class="text-sm text-blue-800">
                  <i class="fas fa-info-circle mr-2"></i>
                  <strong>직거래 할인 안내:</strong> 기본 30% 할인이 적용됩니다.
                </p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label class="block text-gray-700 font-bold mb-2">정가 *</label>
                  <input type="number" id="originalPriceExp" required min="0" step="1000"
                         class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-craft-blue"
                         placeholder="40000" value="${experience?.original_price || ''}"
                         onchange="calculateExperiencePrice()">
                </div>
                
                <div>
                  <label class="block text-gray-700 font-bold mb-2">할인율 *</label>
                  <input type="number" id="discountRateExp" required min="0" max="100"
                         class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-craft-blue"
                         placeholder="30" value="${experience?.discount_rate || 30}"
                         onchange="calculateExperiencePrice()">
                </div>
                
                <div>
                  <label class="block text-gray-700 font-bold mb-2">체험비</label>
                  <input type="number" id="priceExp" readonly
                         class="w-full px-4 py-2 border rounded-lg bg-gray-100"
                         value="${experience?.price || ''}">
                </div>
              </div>
              
              <div id="pricePreviewExp" class="bg-green-50 border border-green-200 rounded-lg p-4 hidden">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <div>
                      <span class="text-gray-600 line-through text-lg" id="previewOriginalExp"></span>
                      <span class="ml-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold" id="previewDiscountExp"></span>
                    </div>
                    <div class="text-2xl font-bold text-craft-blue" id="previewPriceExp"></div>
                  </div>
                  <div class="pt-2 border-t border-green-300">
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">플랫폼 수수료 (9.9%)</span>
                      <span class="text-gray-800" id="previewCommissionExp"></span>
                    </div>
                    <div class="flex justify-between text-sm font-bold mt-1">
                      <span class="text-gray-800">생산자 수익</span>
                      <span class="text-craft-blue" id="previewRevenueExp"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 체험 상세 -->
            <div class="border-b pb-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">체험 상세</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-gray-700 font-bold mb-2">소요 시간 *</label>
                  <input type="number" id="durationHours" required min="0" step="0.5"
                         class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-craft-blue"
                         placeholder="2" value="${experience?.duration_hours || ''}">
                  <p class="text-xs text-gray-500 mt-1">시간</p>
                </div>
                
                <div>
                  <label class="block text-gray-700 font-bold mb-2">최대 참가자 *</label>
                  <input type="number" id="maxParticipants" required min="1"
                         class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-craft-blue"
                         placeholder="15" value="${experience?.max_participants || ''}">
                  <p class="text-xs text-gray-500 mt-1">명</p>
                </div>
              </div>
            </div>
            
            <!-- 이미지 -->
            <div class="mb-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">체험 이미지</h2>
              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">이미지 URL</label>
                <input type="text" id="imageUrl"
                       class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-craft-blue"
                       placeholder="/images/experiences/experience.jpg" value="${experience?.image_url || ''}">
              </div>
            </div>
            
            <!-- 버튼 -->
            <div class="flex gap-4">
              <button type="submit" 
                      class="flex-1 bg-craft-blue text-white py-3 px-6 rounded-lg font-bold hover:bg-opacity-90 transition">
                <i class="fas fa-save mr-2"></i>${isEdit ? '수정 완료' : '등록하기'}
              </button>
              <a href="/producer/manage/${producerId}" 
                 class="bg-gray-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-600 transition">
                취소
              </a>
            </div>
          </form>
        </div>
      </div>
    `;
    
    // 가격 계산 함수
    window.calculateExperiencePrice = function() {
      const originalPrice = parseInt(document.getElementById('originalPriceExp').value) || 0;
      const discountRate = parseInt(document.getElementById('discountRateExp').value) || 0;
      const commissionRate = 9.9; // 플랫폼 수수료율
      
      if (originalPrice > 0) {
        const price = Math.round(originalPrice * (1 - discountRate / 100));
        const commissionAmount = Math.round(price * (commissionRate / 100));
        const producerRevenue = price - commissionAmount;
        
        document.getElementById('priceExp').value = price;
        
        // 미리보기 업데이트
        const preview = document.getElementById('pricePreviewExp');
        preview.classList.remove('hidden');
        document.getElementById('previewOriginalExp').textContent = formatPrice(originalPrice);
        document.getElementById('previewDiscountExp').textContent = discountRate + '% 할인';
        document.getElementById('previewPriceExp').textContent = formatPrice(price);
        document.getElementById('previewCommissionExp').textContent = formatPrice(commissionAmount);
        document.getElementById('previewRevenueExp').textContent = formatPrice(producerRevenue);
      }
    };
    
    // 초기 가격 계산
    if (experience) {
      calculateExperiencePrice();
    }
    
    // 폼 제출 처리
    document.getElementById('experienceForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('experienceName').value,
        region_id: parseInt(document.getElementById('regionId').value),
        producer_id: parseInt(producerId),
        type: document.getElementById('experienceType').value,
        description: document.getElementById('experienceDescription').value,
        original_price: parseInt(document.getElementById('originalPriceExp').value),
        price: parseInt(document.getElementById('priceExp').value),
        discount_rate: parseInt(document.getElementById('discountRateExp').value),
        duration_hours: parseFloat(document.getElementById('durationHours').value),
        max_participants: parseInt(document.getElementById('maxParticipants').value),
        image_url: document.getElementById('imageUrl').value || '/images/experiences/default.jpg'
      };
      
      try {
        if (isEdit) {
          await axios.put(`/api/experiences/${experienceId}`, formData);
          alert('체험이 수정되었습니다!');
        } else {
          await axios.post('/api/experiences', formData);
          alert('체험이 등록되었습니다!');
        }
        window.location.href = `/producer/manage/${producerId}`;
      } catch (error) {
        console.error('체험 저장 오류:', error);
        alert('체험 저장 중 오류가 발생했습니다.');
      }
    });
    
  } catch (error) {
    console.error('체험 폼 로드 오류:', error);
    app.innerHTML = '<div class="container mx-auto px-4 py-20 text-center"><p class="text-red-500">페이지를 불러오는 중 오류가 발생했습니다.</p></div>';
  }
}
