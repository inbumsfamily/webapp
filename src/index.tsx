import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serveStatic } from 'hono/cloudflare-workers';
import { authMiddleware } from './middleware/auth';
import authRouter from './routes/auth';
import articlesRouter from './routes/articles';
import categoriesRouter from './routes/categories';
import commentsRouter from './routes/comments';
import calendarRouter from './routes/calendar';
import type { CloudflareBindings } from './types';

const app = new Hono<{ Bindings: CloudflareBindings }>();

// Middleware
app.use('*', logger());
app.use('/api/*', cors());
app.use('/api/*', authMiddleware);

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }));

// API Routes
app.route('/api/auth', authRouter);
app.route('/api/articles', articlesRouter);
app.route('/api/categories', categoriesRouter);
app.route('/api/comments', commentsRouter);
app.route('/api/calendar', calendarRouter);

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Main page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>제주한라대학교 신문방송사</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <div id="app">
            <!-- Header -->
            <header class="bg-white shadow-sm border-b">
                <div class="container mx-auto px-4">
                    <div class="flex justify-between items-center h-20">
                        <div class="flex items-center">
                            <h1 class="text-2xl font-bold text-blue-900">
                                <i class="fas fa-newspaper mr-2"></i>
                                제주한라대 신문방송사
                            </h1>
                        </div>
                        <nav class="hidden md:flex space-x-6">
                            <a href="#" class="text-gray-700 hover:text-blue-600">방송국</a>
                            <a href="#" class="text-gray-700 hover:text-blue-600">신문사</a>
                            <a href="#" class="text-gray-700 hover:text-blue-600">기획보도</a>
                            <a href="#" class="text-gray-700 hover:text-blue-600">쇼츠</a>
                            <a href="#" class="text-gray-700 hover:text-blue-600">캠퍼스</a>
                        </nav>
                        <div class="flex items-center space-x-4">
                            <button id="loginBtn" class="text-gray-700 hover:text-blue-600">
                                <i class="fas fa-user"></i> 로그인
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Hero Section -->
            <section class="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
                <div class="container mx-auto px-4 text-center">
                    <h2 class="text-4xl font-bold mb-4">제주한라대학교의 목소리</h2>
                    <p class="text-xl mb-8">캠퍼스의 생생한 소식을 전합니다</p>
                    <div class="flex justify-center space-x-4">
                        <button class="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                            최신 뉴스 보기
                        </button>
                        <button class="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900">
                            방송 다시보기
                        </button>
                    </div>
                </div>
            </section>

            <!-- Main Content -->
            <main class="container mx-auto px-4 py-12">
                <!-- Latest Articles -->
                <section class="mb-12">
                    <h3 class="text-2xl font-bold mb-6">최신 기사</h3>
                    <div id="articlesGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Articles will be loaded here -->
                        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            <div class="h-48 bg-gray-200 animate-pulse"></div>
                            <div class="p-4">
                                <div class="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Academic Calendar -->
                <section class="mb-12">
                    <h3 class="text-2xl font-bold mb-6">학사일정</h3>
                    <div id="calendarContainer" class="bg-white rounded-lg shadow-md p-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <!-- Calendar events will be loaded here -->
                        </div>
                    </div>
                </section>
            </main>

            <!-- Footer -->
            <footer class="bg-gray-800 text-white py-8">
                <div class="container mx-auto px-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h4 class="text-lg font-semibold mb-4">제주한라대학교 신문방송사</h4>
                            <p class="text-gray-400">제주특별자치도 제주시 한라대학로 38</p>
                            <p class="text-gray-400">Tel: 064-741-7000</p>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-4">빠른 링크</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-white">학교 홈페이지</a></li>
                                <li><a href="#" class="hover:text-white">도서관</a></li>
                                <li><a href="#" class="hover:text-white">학사정보</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-4">소셜 미디어</h4>
                            <div class="flex space-x-4">
                                <a href="#" class="text-gray-400 hover:text-white">
                                    <i class="fab fa-facebook fa-2x"></i>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-white">
                                    <i class="fab fa-instagram fa-2x"></i>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-white">
                                    <i class="fab fa-youtube fa-2x"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                        <p>&copy; 2025 제주한라대학교 신문방송사. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `);
});

// Admin page
app.get('/admin', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>관리자 대시보드 - 제주한라대학교 신문방송사</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100">
        <div id="adminApp" class="min-h-screen">
            <!-- Admin dashboard will be loaded here -->
            <div class="flex h-screen">
                <!-- Sidebar -->
                <div class="w-64 bg-gray-800 text-white">
                    <div class="p-4">
                        <h1 class="text-xl font-bold">관리자 대시보드</h1>
                    </div>
                    <nav class="mt-8">
                        <a href="#" class="block px-4 py-2 hover:bg-gray-700">
                            <i class="fas fa-tachometer-alt mr-2"></i> 대시보드
                        </a>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-700">
                            <i class="fas fa-newspaper mr-2"></i> 기사 관리
                        </a>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-700">
                            <i class="fas fa-users mr-2"></i> 사용자 관리
                        </a>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-700">
                            <i class="fas fa-calendar mr-2"></i> 학사일정
                        </a>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-700">
                            <i class="fas fa-cog mr-2"></i> 설정
                        </a>
                    </nav>
                </div>
                
                <!-- Main Content -->
                <div class="flex-1 p-8">
                    <h2 class="text-2xl font-bold mb-6">대시보드</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h3 class="text-gray-500 text-sm">전체 기사</h3>
                            <p class="text-3xl font-bold">0</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h3 class="text-gray-500 text-sm">회원 수</h3>
                            <p class="text-3xl font-bold">0</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h3 class="text-gray-500 text-sm">오늘 방문자</h3>
                            <p class="text-3xl font-bold">0</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h3 class="text-gray-500 text-sm">댓글 수</h3>
                            <p class="text-3xl font-bold">0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/admin.js"></script>
    </body>
    </html>
  `);
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Application error:', err);
  return c.json({ error: 'Internal server error' }, 500);
});

export default app;