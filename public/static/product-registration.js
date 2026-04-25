// 상품 등록 페이지 기능

// 현재 단계 관리
let currentStep = 1;
let listingData = {
  id: null,
  title: '',
  short_description: '',
  category: 'tea',
  price: 0,
  images: [],
  is_funding: false,
  funding_goal: 0,
  funding_days: 30,
  schedules: []
};

// 페이지 로드 시
document.addEventListener('DOMContentLoaded', () => {
  initProductRegistration();
});

function initProductRegistration() {
  // 로그인 확인
  const user = getLoggedInUser();
  if (!user) {
    alert('로그인이 필요한 서비스입니다.');
    window.location.href = '/';
    return;
  }
  
  // 이벤트 리스너 등록
  setupEventListeners();
}

function setupEventListeners() {
  // 다음 버튼
  const nextBtn = document.getElementById('nextStepBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', goToNextStep);
  }
  
  // 이전 버튼
  const prevBtn = document.getElementById('prevStepBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', goToPreviousStep);
  }
  
  // 이미지 업로드
  const imageInput = document.getElementById('productImages');
  if (imageInput) {
    imageInput.addEventListener('change', handleImageUpload);
  }
  
  // AI 생성 버튼
  const aiBtn = document.getElementById('generateAiBtn');
  if (aiBtn) {
    aiBtn.addEventListener('click', generateAIDescription);
  }
  
  // 펀딩 토글
  const fundingCheckbox = document.getElementById('enableFunding');
  if (fundingCheckbox) {
    fundingCheckbox.addEventListener('change', toggleFundingOptions);
  }
  
  // 일정 추가 버튼
  const addScheduleBtn = document.getElementById('addScheduleBtn');
  if (addScheduleBtn) {
    addScheduleBtn.addEventListener('click', addSchedule);
  }
  
  // 최종 제출 버튼
  const submitBtn = document.getElementById('submitListingBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', submitListing);
  }
}

async function goToNextStep() {
  if (currentStep === 1) {
    // 기본 정보 유효성 검사
    const title = document.getElementById('productTitle').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const category = document.getElementById('productCategory').value;
    const price = parseInt(document.getElementById('productPrice').value);
    
    if (!title || !description || !price || price <= 0) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }
    
    if (listingData.images.length === 0) {
      alert('최소 1장 이상의 상품 이미지를 업로드해주세요.');
      return;
    }
    
    // 데이터 저장
    listingData.title = title;
    listingData.short_description = description;
    listingData.category = category;
    listingData.price = price;
    
    // 서버에 초안 저장
    try {
      const response = await axios.post('/api/listings', listingData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        listingData.id = response.data.listing_id;
        currentStep = 2;
        updateStepDisplay();
      } else {
        alert(response.data.error || '상품 등록 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('상품 등록 중 오류가 발생했습니다.');
    }
    
  } else if (currentStep === 2) {
    // AI 상세페이지 생성 여부 확인
    const aiDescription = document.getElementById('aiGeneratedDescription').value.trim();
    if (!aiDescription) {
      if (!confirm('AI 상세페이지를 생성하지 않았습니다. 계속 진행하시겠습니까?')) {
        return;
      }
    }
    
    currentStep = 3;
    updateStepDisplay();
    
  } else if (currentStep === 3) {
    // 펀딩/일정 설정 저장
    const enableFunding = document.getElementById('enableFunding').checked;
    
    if (enableFunding) {
      const fundingGoal = parseInt(document.getElementById('fundingGoal').value);
      const fundingDays = parseInt(document.getElementById('fundingDays').value);
      
      if (!fundingGoal || fundingGoal <= 0) {
        alert('목표 금액을 입력해주세요.');
        return;
      }
      
      // 펀딩 설정 저장
      try {
        const startDate = new Date().toISOString().split('T')[0];
        const endDate = new Date(Date.now() + fundingDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        await axios.put(`/api/listings/${listingData.id}/funding`, {
          funding_goal: fundingGoal,
          funding_start_date: startDate,
          funding_end_date: endDate,
          min_funding_amount: 10000
        });
        
        listingData.is_funding = true;
        listingData.funding_goal = fundingGoal;
      } catch (error) {
        console.error('Error:', error);
        alert('펀딩 설정 중 오류가 발생했습니다.');
        return;
      }
    }
    
    currentStep = 4;
    updateStepDisplay();
    loadPreview();
  }
}

function goToPreviousStep() {
  if (currentStep > 1) {
    currentStep--;
    updateStepDisplay();
  }
}

function updateStepDisplay() {
  // 모든 단계 숨기기
  document.querySelectorAll('[data-step]').forEach(el => {
    el.classList.add('hidden');
  });
  
  // 현재 단계 표시
  const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
  if (currentStepEl) {
    currentStepEl.classList.remove('hidden');
  }
  
  // 진행 표시줄 업데이트
  const progress = (currentStep / 4) * 100;
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = progress + '%';
  }
  
  // 버튼 상태 업데이트
  const prevBtn = document.getElementById('prevStepBtn');
  const nextBtn = document.getElementById('nextStepBtn');
  
  if (prevBtn) {
    prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-block';
  }
  
  if (nextBtn) {
    nextBtn.style.display = currentStep === 4 ? 'none' : 'inline-block';
  }
}

function handleImageUpload(e) {
  const files = Array.from(e.target.files);
  
  if (files.length === 0) return;
  
  if (listingData.images.length + files.length > 10) {
    alert('이미지는 최대 10장까지 업로드 가능합니다.');
    return;
  }
  
  files.forEach(file => {
    if (file.size > 5 * 1024 * 1024) {
      alert(`${file.name}은(는) 5MB를 초과합니다.`);
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      listingData.images.push(imageUrl);
      displayImagePreview(imageUrl);
    };
    reader.readAsDataURL(file);
  });
}

function displayImagePreview(imageUrl) {
  const previewContainer = document.getElementById('imagePreviewContainer');
  if (!previewContainer) return;
  
  const imgDiv = document.createElement('div');
  imgDiv.className = 'relative inline-block mr-2 mb-2';
  imgDiv.innerHTML = `
    <img src="${imageUrl}" class="w-24 h-24 object-cover rounded border">
    <button onclick="removeImage('${imageUrl}')" class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
      ×
    </button>
  `;
  previewContainer.appendChild(imgDiv);
}

function removeImage(imageUrl) {
  listingData.images = listingData.images.filter(img => img !== imageUrl);
  loadImagePreviews();
}

function loadImagePreviews() {
  const previewContainer = document.getElementById('imagePreviewContainer');
  if (!previewContainer) return;
  
  previewContainer.innerHTML = '';
  listingData.images.forEach(displayImagePreview);
}

async function generateAIDescription() {
  if (!listingData.id) {
    alert('먼저 기본 정보를 저장해주세요.');
    return;
  }
  
  const btn = document.getElementById('generateAiBtn');
  btn.disabled = true;
  btn.textContent = 'AI 생성 중...';
  
  try {
    const response = await axios.post(`/api/listings/${listingData.id}/generate-ai-description`);
    
    if (response.data.success) {
      const aiTextarea = document.getElementById('aiGeneratedDescription');
      if (aiTextarea) {
        aiTextarea.value = response.data.description;
      }
      alert('AI 상세페이지가 생성되었습니다!');
    } else {
      alert(response.data.error || 'AI 생성 중 오류가 발생했습니다.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('AI 생성 중 오류가 발생했습니다.');
  } finally {
    btn.disabled = false;
    btn.textContent = '🤖 AI로 상세페이지 자동 생성';
  }
}

function toggleFundingOptions() {
  const fundingCheckbox = document.getElementById('enableFunding');
  const fundingOptions = document.getElementById('fundingOptions');
  
  if (fundingOptions) {
    fundingOptions.style.display = fundingCheckbox.checked ? 'block' : 'none';
  }
}

async function addSchedule() {
  if (!listingData.id) {
    alert('먼저 기본 정보를 저장해주세요.');
    return;
  }
  
  const date = document.getElementById('scheduleDate').value;
  const startTime = document.getElementById('scheduleStartTime').value;
  const endTime = document.getElementById('scheduleEndTime').value;
  const maxParticipants = parseInt(document.getElementById('scheduleMaxParticipants').value);
  
  if (!date || !startTime || !endTime || !maxParticipants) {
    alert('모든 일정 정보를 입력해주세요.');
    return;
  }
  
  try {
    const response = await axios.post(`/api/listings/${listingData.id}/schedules`, {
      schedule_date: date,
      start_time: startTime,
      end_time: endTime,
      max_participants: maxParticipants
    });
    
    if (response.data.success) {
      listingData.schedules.push({ date, startTime, endTime, maxParticipants });
      displaySchedules();
      
      // 입력 초기화
      document.getElementById('scheduleDate').value = '';
      document.getElementById('scheduleStartTime').value = '';
      document.getElementById('scheduleEndTime').value = '';
      document.getElementById('scheduleMaxParticipants').value = '10';
      
      alert('일정이 추가되었습니다.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('일정 추가 중 오류가 발생했습니다.');
  }
}

function displaySchedules() {
  const container = document.getElementById('scheduleList');
  if (!container) return;
  
  container.innerHTML = listingData.schedules.map((schedule, index) => `
    <div class="bg-gray-50 p-3 rounded border mb-2">
      <div class="flex justify-between items-center">
        <div>
          <span class="font-medium">${schedule.date}</span>
          <span class="text-gray-600 ml-2">${schedule.startTime} - ${schedule.endTime}</span>
          <span class="text-sm text-gray-500 ml-2">최대 ${schedule.maxParticipants}명</span>
        </div>
        <button onclick="removeSchedule(${index})" class="text-red-500 hover:text-red-700">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function removeSchedule(index) {
  listingData.schedules.splice(index, 1);
  displaySchedules();
}

function loadPreview() {
  // 미리보기 데이터 로드
  document.getElementById('previewTitle').textContent = listingData.title;
  document.getElementById('previewDescription').textContent = listingData.short_description;
  document.getElementById('previewPrice').textContent = formatPrice(listingData.price);
  document.getElementById('previewCategory').textContent = getCategoryName(listingData.category);
  document.getElementById('previewImageCount').textContent = listingData.images.length;
  document.getElementById('previewFunding').textContent = listingData.is_funding ? '예' : '아니오';
  document.getElementById('previewScheduleCount').textContent = listingData.schedules.length;
  
  // 대표 이미지
  if (listingData.images.length > 0) {
    document.getElementById('previewMainImage').src = listingData.images[0];
  }
}

function getCategoryName(category) {
  const categories = {
    'tea': '차',
    'craft': '공예품',
    'experience': '체험',
    'education': '교육'
  };
  return categories[category] || category;
}

async function submitListing() {
  if (!confirm('상품을 제출하시겠습니까? 제출 후 관리자 승인이 필요합니다.')) {
    return;
  }
  
  const btn = document.getElementById('submitListingBtn');
  btn.disabled = true;
  btn.textContent = '제출 중...';
  
  try {
    const response = await axios.put(`/api/listings/${listingData.id}/submit`);
    
    if (response.data.success) {
      alert('상품이 성공적으로 제출되었습니다! 관리자 승인 후 게시됩니다.');
      window.location.href = '/my-listings';
    } else {
      alert(response.data.error || '제출 중 오류가 발생했습니다.');
      btn.disabled = false;
      btn.textContent = '상품 제출하기';
    }
  } catch (error) {
    console.error('Error:', error);
    alert('제출 중 오류가 발생했습니다.');
    btn.disabled = false;
    btn.textContent = '상품 제출하기';
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(price);
}

function getLoggedInUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}
