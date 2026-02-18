// 교육 진행현황 페이지

// 페이지 경로 확인
const currentPath = window.location.pathname;

// 교육 진행현황 페이지인 경우
if (currentPath === '/education/status') {
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      // 다도교육과 명상교육 데이터 가져오기
      const [teaResponse, meditationResponse] = await Promise.all([
        axios.get('/api/education/applications/status?education_type=tea_education'),
        axios.get('/api/education/applications/status?education_type=meditation')
      ]);
      
      const teaData = teaResponse.data;
      const meditationData = meditationResponse.data;
      
      // 페이지 렌더링
      renderEducationStatus(teaData, meditationData);
    } catch (error) {
      console.error('Error loading education status:', error);
      document.getElementById('app').innerHTML = '<div class="text-center text-red-600 py-20">데이터를 불러오는데 실패했습니다.</div>';
    }
  });
}

function renderEducationStatus(teaData, meditationData) {
  const appContainer = document.getElementById('app');
  
  appContainer.innerHTML = `
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">교육 진행 현황</h1>
      
      <!-- 탭 메뉴 -->
      <div class="mb-8">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button data-tab="tea" class="tab-btn border-b-2 border-tea-green text-tea-green py-4 px-1 text-center border-b-2 font-medium text-sm">
              <i class="fas fa-leaf mr-2"></i>다도교육 진행현황
            </button>
            <button data-tab="meditation" class="tab-btn border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-center border-b-2 font-medium text-sm">
              <i class="fas fa-om mr-2"></i>명상교육 진행현황
            </button>
          </nav>
        </div>
      </div>
      
      <!-- 다도교육 진행현황 -->
      <div id="tea-tab-content" class="tab-content">
        ${renderStatusSection('tea', '다도교육', teaData)}
      </div>
      
      <!-- 명상교육 진행현황 -->
      <div id="meditation-tab-content" class="tab-content hidden">
        ${renderStatusSection('meditation', '명상교육', meditationData)}
      </div>
    </div>
  `;
  
  // 탭 전환 이벤트
  setupTabSwitching();
  
  // 신청 목록 테이블 이벤트
  setupApplicationTables();
}

function renderStatusSection(type, title, data) {
  return `
    <!-- 통계 카드 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <!-- 전체 신청 -->
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm mb-1">전체 신청</p>
            <p class="text-3xl font-bold text-gray-800">${data.total}</p>
          </div>
          <div class="bg-blue-100 rounded-full p-3">
            <i class="fas fa-clipboard-list text-blue-600 text-2xl"></i>
          </div>
        </div>
      </div>
      
      <!-- 승인 대기 -->
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm mb-1">승인 대기</p>
            <p class="text-3xl font-bold text-yellow-600">${data.pending}</p>
          </div>
          <div class="bg-yellow-100 rounded-full p-3">
            <i class="fas fa-clock text-yellow-600 text-2xl"></i>
          </div>
        </div>
      </div>
      
      <!-- 진행 중 -->
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm mb-1">진행 중</p>
            <p class="text-3xl font-bold text-green-600">${data.approved}</p>
          </div>
          <div class="bg-green-100 rounded-full p-3">
            <i class="fas fa-spinner text-green-600 text-2xl"></i>
          </div>
        </div>
      </div>
      
      <!-- 완료 -->
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm mb-1">완료</p>
            <p class="text-3xl font-bold text-purple-600">${data.completed}</p>
          </div>
          <div class="bg-purple-100 rounded-full p-3">
            <i class="fas fa-check-circle text-purple-600 text-2xl"></i>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 전체 신청 목록 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6 bg-gray-50 border-b border-gray-200">
        <h2 class="text-xl font-bold text-gray-800">
          <i class="fas fa-list mr-2"></i>전체 신청 목록
        </h2>
      </div>
      
      <!-- 상태 필터 탭 -->
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex">
          <button data-status-filter="all" data-type="${type}" class="status-filter-btn bg-tea-green text-white px-6 py-3 font-medium text-sm">
            전체 (${data.total})
          </button>
          <button data-status-filter="pending" data-type="${type}" class="status-filter-btn text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-6 py-3 font-medium text-sm">
            승인 대기 (${data.pending})
          </button>
          <button data-status-filter="approved" data-type="${type}" class="status-filter-btn text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-6 py-3 font-medium text-sm">
            진행 중 (${data.approved})
          </button>
          <button data-status-filter="completed" data-type="${type}" class="status-filter-btn text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-6 py-3 font-medium text-sm">
            완료 (${data.completed})
          </button>
        </nav>
      </div>
      
      <!-- 테이블 -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200" id="${type}-applications-table">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">신청일</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">기관명</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">담당자</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">인원</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">교육일</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">강사</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            ${data.recentApplications.map(app => renderApplicationRow(app)).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderApplicationRow(app) {
  const statusBadge = {
    'pending': '<span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">승인 대기</span>',
    'approved': '<span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">진행 중</span>',
    'completed': '<span class="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">완료</span>',
    'cancelled': '<span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">취소</span>'
  };
  
  const organizationTypeText = {
    'school': '학교',
    'company': '기업',
    'government': '공공기관',
    'community': '복지시설',
    'hospital': '병원',
    'kindergarten': '유치원',
    'other': '기타'
  };
  
  return `
    <tr class="hover:bg-gray-50 cursor-pointer" data-application-id="${app.id}">
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${formatDate(app.created_at)}
      </td>
      <td class="px-6 py-4 text-sm">
        <div class="font-medium text-gray-900">${app.organization_name}</div>
        <div class="text-gray-500">${organizationTypeText[app.organization_type] || app.organization_type}</div>
      </td>
      <td class="px-6 py-4 text-sm">
        <div class="text-gray-900">${app.contact_person}</div>
        <div class="text-gray-500">${app.contact_phone}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${app.participant_count}명
      </td>
      <td class="px-6 py-4 text-sm text-gray-900">
        <div>${app.preferred_date || '-'}</div>
        <div class="text-gray-500">${app.preferred_time || ''}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        ${statusBadge[app.status] || app.status}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${app.instructor_name || '-'}
      </td>
    </tr>
  `;
}

function setupTabSwitching() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      
      // 탭 버튼 스타일 업데이트
      tabButtons.forEach(b => {
        b.classList.remove('border-tea-green', 'text-tea-green');
        b.classList.add('border-transparent', 'text-gray-500');
      });
      btn.classList.remove('border-transparent', 'text-gray-500');
      btn.classList.add('border-tea-green', 'text-tea-green');
      
      // 콘텐츠 표시/숨김
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
      });
      document.getElementById(`${tab}-tab-content`).classList.remove('hidden');
    });
  });
}

function setupApplicationTables() {
  // 상태 필터 버튼 이벤트
  const statusFilterButtons = document.querySelectorAll('.status-filter-btn');
  statusFilterButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const status = btn.getAttribute('data-status-filter');
      const type = btn.getAttribute('data-type');
      
      // 버튼 스타일 업데이트
      const parentNav = btn.parentElement;
      parentNav.querySelectorAll('.status-filter-btn').forEach(b => {
        b.classList.remove('bg-tea-green', 'text-white');
        b.classList.add('text-gray-500');
      });
      btn.classList.remove('text-gray-500');
      btn.classList.add('bg-tea-green', 'text-white');
      
      // 테이블 데이터 필터링
      await filterApplicationTable(type, status);
    });
  });
  
  // 테이블 행 클릭 이벤트 (상세 보기)
  const tableRows = document.querySelectorAll('tr[data-application-id]');
  tableRows.forEach(row => {
    row.addEventListener('click', () => {
      const appId = row.getAttribute('data-application-id');
      // TODO: 상세 보기 모달 또는 페이지로 이동
      alert(`신청 ID ${appId}의 상세 정보를 표시합니다.`);
    });
  });
}

async function filterApplicationTable(type, status) {
  try {
    // API 호출
    const educationType = type === 'tea' ? 'tea_education' : 'meditation';
    let url = `/api/education-applications?education_type=${educationType}`;
    if (status !== 'all') {
      url += `&status=${status}`;
    }
    
    const response = await axios.get(url);
    const applications = response.data;
    
    // 테이블 업데이트
    const tableBody = document.querySelector(`#${type}-applications-table tbody`);
    if (applications.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="7" class="px-6 py-12 text-center text-gray-500">데이터가 없습니다.</td></tr>';
    } else {
      tableBody.innerHTML = applications.map(app => renderApplicationRow(app)).join('');
      
      // 새로운 행에 클릭 이벤트 추가
      tableBody.querySelectorAll('tr[data-application-id]').forEach(row => {
        row.addEventListener('click', () => {
          const appId = row.getAttribute('data-application-id');
          alert(`신청 ID ${appId}의 상세 정보를 표시합니다.`);
        });
      });
    }
  } catch (error) {
    console.error('Error filtering applications:', error);
    alert('데이터를 불러오는데 실패했습니다.');
  }
}

// 날짜 포맷팅 함수 (app.js에도 있지만 독립적으로 동작하도록 추가)
if (typeof formatDate === 'undefined') {
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
