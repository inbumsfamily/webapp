import { Hono } from 'hono';
import type { CloudflareBindings } from '../types';

const pagesRouter = new Hono<{ Bindings: CloudflareBindings }>();

// Category page template
const categoryPageTemplate = (categoryName: string, subCategories: string[] = []) => `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${categoryName} - 제주한라대학교 신문방송사</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <div class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-md p-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">
                <i class="fas fa-folder-open mr-2"></i>
                ${categoryName}
            </h1>
            
            ${subCategories.length > 0 ? `
            <div class="mb-6">
                <h2 class="text-xl font-semibold mb-3">하위 메뉴</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    ${subCategories.map(sub => `
                        <a href="#" class="bg-blue-50 hover:bg-blue-100 p-3 rounded-lg text-center transition-colors">
                            ${sub}
                        </a>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="mt-8">
                <h2 class="text-xl font-semibold mb-4">최신 기사</h2>
                <div id="articlesList" class="space-y-4">
                    <!-- Articles will be loaded here -->
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-spinner fa-spin text-3xl mb-4"></i>
                        <p>기사를 불러오는 중...</p>
                    </div>
                </div>
            </div>
            
            <div class="mt-8">
                <a href="/" class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    <i class="fas fa-home mr-2"></i>
                    메인으로 돌아가기
                </a>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
        // Load articles for this category
        async function loadCategoryArticles() {
            try {
                const response = await axios.get('/api/articles?category=${encodeURIComponent(categoryName)}');
                const articlesList = document.getElementById('articlesList');
                
                if (response.data.articles && response.data.articles.length > 0) {
                    articlesList.innerHTML = response.data.articles.map(article => \`
                        <article class="border-b pb-4">
                            <h3 class="text-lg font-semibold mb-2">
                                <a href="/article/\${article.slug}" class="text-gray-800 hover:text-blue-600">
                                    \${article.title}
                                </a>
                            </h3>
                            <p class="text-gray-600 text-sm mb-2">\${article.content.substring(0, 150)}...</p>
                            <div class="text-xs text-gray-500">
                                <span class="mr-4">
                                    <i class="fas fa-user mr-1"></i> \${article.author_name}
                                </span>
                                <span class="mr-4">
                                    <i class="fas fa-calendar mr-1"></i> \${new Date(article.created_at).toLocaleDateString('ko-KR')}
                                </span>
                                <span>
                                    <i class="fas fa-eye mr-1"></i> \${article.view_count}
                                </span>
                            </div>
                        </article>
                    \`).join('');
                } else {
                    articlesList.innerHTML = '<p class="text-center text-gray-500 py-8">등록된 기사가 없습니다.</p>';
                }
            } catch (error) {
                console.error('Failed to load articles:', error);
                document.getElementById('articlesList').innerHTML = '<p class="text-center text-red-500 py-8">기사를 불러오는 중 오류가 발생했습니다.</p>';
            }
        }
        
        loadCategoryArticles();
    </script>
</body>
</html>
`;

// 방송국 routes
pagesRouter.get('/broadcast', (c) => {
  return c.html(categoryPageTemplate('방송국', [
    '방송국소개', '한라뉴스', '한라인터뷰', '전공특집', 
    '캠퍼스투어', '문화·예술(방송)', '라디오·팟캐스트', '방송국 활동기'
  ]));
});

// 신문사 routes
pagesRouter.get('/newspaper', (c) => {
  return c.html(categoryPageTemplate('신문사', [
    '신문사소개', '현장취재', '캠퍼스 리포트', '신문사 활동기'
  ]));
});

// 캠퍼스 routes
pagesRouter.get('/campus', (c) => {
  return c.html(categoryPageTemplate('캠퍼스', [
    '대학소식', '지우전(지금 우리 전공은)', '동아리', '학생활동',
    '캠퍼스 라이프', '장학·복지·지원', 'X-파일', '졸업생 인터뷰'
  ]));
});

// 쇼츠 routes
pagesRouter.get('/shorts', (c) => {
  return c.html(categoryPageTemplate('쇼츠', [
    '한컷 뉴스', '이슈 브리핑', '익명소식', '재학생 꿀팁'
  ]));
});

// 기획보도 routes
pagesRouter.get('/special-report', (c) => {
  return c.html(categoryPageTemplate('기획보도', [
    '진로·취업', '청년·지역', '복지·권익', '학술·연구'
  ]));
});

// 제주소식 routes
pagesRouter.get('/jeju-news', (c) => {
  return c.html(categoryPageTemplate('제주소식', [
    '제주이슈', '문화탐방', '환경과 자연', '청년 창업', '제주전통마을'
  ]));
});

// 오피니언 routes
pagesRouter.get('/opinion', (c) => {
  return c.html(categoryPageTemplate('오피니언', [
    '사설·칼럼', '교수 칼럼', '독자 의견·제안', '익명 목소리', '함께 읽는 책·영화 추천'
  ]));
});

// 에세이 routes
pagesRouter.get('/essay', (c) => {
  return c.html(categoryPageTemplate('에세이', [
    '제주에서 보내는 시간', '꿈과 희망', '여행과 탐방', 
    '문학과 예술', '이달의 테마 에세이', '나만의 생각 정리'
  ]));
});

export default pagesRouter;