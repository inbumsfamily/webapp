-- Test users (password is 'password123' for all users, hashed with bcrypt)
INSERT OR IGNORE INTO users (email, nickname, password_hash, role_id) VALUES 
  ('admin@chu.ac.kr', '관리자', '$2a$10$YOWsQdLWbXzSQ6hO2qFvNOiMxP.t8LJKqNdSq6h4vKXhXiE2jQIhO', 1),
  ('editor@chu.ac.kr', '편집기자1', '$2a$10$YOWsQdLWbXzSQ6hO2qFvNOiMxP.t8LJKqNdSq6h4vKXhXiE2jQIhO', 2),
  ('pd@chu.ac.kr', '방송PD1', '$2a$10$YOWsQdLWbXzSQ6hO2qFvNOiMxP.t8LJKqNdSq6h4vKXhXiE2jQIhO', 3),
  ('premium@chu.ac.kr', '프리미엄회원1', '$2a$10$YOWsQdLWbXzSQ6hO2qFvNOiMxP.t8LJKqNdSq6h4vKXhXiE2jQIhO', 4),
  ('user@chu.ac.kr', '일반회원1', '$2a$10$YOWsQdLWbXzSQ6hO2qFvNOiMxP.t8LJKqNdSq6h4vKXhXiE2jQIhO', 5);

-- Sample articles (matching the exact column structure)
INSERT OR IGNORE INTO articles (title, slug, content, author_id, category_id, status, featured_image_url, youtube_embed_id, article_type, published_at, view_count) VALUES 
  ('2025학년도 신입생 오리엔테이션 성황리 개최', 
   '2025-freshman-orientation', 
   '<p>제주한라대학교가 2025학년도 신입생 오리엔테이션을 성황리에 개최했다. 이번 오리엔테이션에는 신입생 1,200여 명이 참석해 대학 생활의 첫걸음을 내디뎠다.</p><p>오리엔테이션에서는 학교 소개, 학과별 교육과정 안내, 선배들과의 만남 등 다양한 프로그램이 진행되었다.</p>', 
   2, 
   6, 
   'published', 
   'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
   NULL,
   'normal',
   datetime('now', '-2 days'),
   156),
  
  ('제주한라대, 지역사회 봉사활동 확대', 
   'community-service-expansion', 
   '<p>제주한라대학교가 지역사회 봉사활동을 대폭 확대한다고 발표했다. 이번 학기부터 모든 재학생이 의무적으로 봉사활동에 참여하게 된다.</p><p>학교 측은 "학생들이 지역사회에 기여하고 실무 경험을 쌓을 수 있는 좋은 기회가 될 것"이라고 밝혔다.</p>', 
   2, 
   9, 
   'published', 
   'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
   NULL,
   'normal',
   datetime('now', '-3 days'),
   89),
  
  ('캠퍼스 내 신규 도서관 건립 확정', 
   'new-library-construction', 
   '<p>제주한라대학교가 캠퍼스 내에 최첨단 시설을 갖춘 신규 도서관을 건립하기로 확정했다. 총 200억 원이 투입되는 이번 프로젝트는 2026년 완공을 목표로 한다.</p>', 
   3, 
   7, 
   'published', 
   'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
   NULL,
   'normal',
   datetime('now', '-4 days'),
   234),
  
  ('학생회장 선거 투표율 역대 최고 기록', 
   'student-election-record', 
   '<p>제44대 학생회장 선거가 역대 최고 투표율을 기록하며 성공적으로 마무리되었다. 전체 재학생의 78.5%가 투표에 참여했다.</p>', 
   2, 
   18, 
   'published', 
   NULL,
   NULL,
   'normal',
   datetime('now', '-5 days'),
   412),
  
  ('[한컷뉴스] 봄꽃 만개한 캠퍼스', 
   'spring-flowers-campus', 
   '<p>따뜻한 봄 날씨와 함께 캠퍼스 곳곳에 봄꽃이 만개했다.</p>', 
   3, 
   15, 
   'published', 
   'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800',
   NULL,
   'shorts',
   datetime('now', '-6 days'),
   567);

-- Sample comments
INSERT OR IGNORE INTO comments (content, article_id, user_id) VALUES 
  ('좋은 소식이네요! 신입생 여러분 환영합니다.', 1, 4),
  ('봉사활동 프로그램이 정말 의미 있어 보입니다.', 2, 5),
  ('새 도서관이 빨리 완공되었으면 좋겠네요.', 3, 5);

-- Sample academic calendar events
INSERT OR IGNORE INTO academic_calendar_events (event_date_start, event_date_end, title, description, source) VALUES 
  ('2025-03-02', '2025-03-02', '2025학년도 입학식', '신입생 입학식 및 오리엔테이션', 'manual'),
  ('2025-03-04', '2025-03-04', '1학기 개강', '2025학년도 1학기 수업 시작', 'manual'),
  ('2025-04-15', '2025-04-19', '중간고사', '1학기 중간고사 기간', 'manual'),
  ('2025-06-10', '2025-06-14', '기말고사', '1학기 기말고사 기간', 'manual'),
  ('2025-06-21', '2025-08-31', '하계방학', '여름방학 기간', 'manual'),
  ('2025-09-02', '2025-09-02', '2학기 개강', '2025학년도 2학기 수업 시작', 'manual'),
  ('2025-10-21', '2025-10-25', '중간고사', '2학기 중간고사 기간', 'manual'),
  ('2025-12-16', '2025-12-20', '기말고사', '2학기 기말고사 기간', 'manual');