-- Visit Kirehe – MySQL schema and seed data
-- Run this in MySQL (e.g. phpMyAdmin or: mysql -u root -p < server/db/schema.sql)

CREATE DATABASE IF NOT EXISTS visitkirehe CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE visitkirehe;

-- Attractions
CREATE TABLE IF NOT EXISTS attractions (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  image VARCHAR(500),
  location VARCHAR(255),
  category VARCHAR(100),
  map_link VARCHAR(500),
  coordinates JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Accommodations (hotels)
CREATE TABLE IF NOT EXISTS accommodations (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  description TEXT,
  price_range VARCHAR(20),
  price_min INT,
  price_max INT,
  rating DECIMAL(2,1),
  image VARCHAR(500),
  contact VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date DATE,
  location VARCHAR(255),
  description TEXT,
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery
CREATE TABLE IF NOT EXISTS gallery (
  id VARCHAR(64) PRIMARY KEY,
  src VARCHAR(500) NOT NULL,
  alt VARCHAR(255),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog
CREATE TABLE IF NOT EXISTS blog (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT,
  author VARCHAR(255),
  image VARCHAR(500),
  date DATE,
  slug VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages
CREATE TABLE IF NOT EXISTS messages (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Travel info (single row)
CREATE TABLE IF NOT EXISTS travel_info (
  id INT PRIMARY KEY DEFAULT 1,
  transport TEXT,
  best_time TEXT,
  safety TEXT,
  tips TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHECK (id = 1)
);

-- Settings (single row)
CREATE TABLE IF NOT EXISTS settings (
  id INT PRIMARY KEY DEFAULT 1,
  site_name VARCHAR(255),
  contact_email VARCHAR(255),
  phone VARCHAR(100),
  facebook VARCHAR(500),
  twitter VARCHAR(500),
  instagram VARCHAR(500),
  banner_images JSON,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHECK (id = 1)
);

-- Analytics (single row)
CREATE TABLE IF NOT EXISTS analytics (
  id INT PRIMARY KEY DEFAULT 1,
  total_visitors INT DEFAULT 0,
  monthly_visitors JSON,
  attraction_views JSON,
  hotel_views JSON,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHECK (id = 1)
);

-- Activities (things to do)
CREATE TABLE IF NOT EXISTS activities (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(20),
  image VARCHAR(500),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100),
  text TEXT,
  rating INT DEFAULT 5,
  avatar VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data (only if tables are empty)
INSERT IGNORE INTO attractions (id, name, slug, description, short_description, image, location, category, coordinates) VALUES
('lake-nasho', 'Lake Nasho', 'lake-nasho', 'One of Rwanda''s largest lakes, offering stunning views, bird watching, and peaceful boat rides.', 'Stunning lake with bird watching and boat rides.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'Kirehe District', 'Nature', '[-2.2833, 30.6167]'),
('rusumo-falls', 'Rusumo Falls', 'rusumo-falls', 'Magnificent waterfall on the Kagera River at the Rwanda-Tanzania border.', 'Magnificent waterfall on the Kagera River.', 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800', 'Rusumo Sector', 'Nature', '[-2.3833, 30.7833]'),
('akagera-national-park', 'Akagera National Park', 'akagera-national-park', 'Rwanda''s only savanna park, home to the Big Five and diverse wildlife.', 'Savanna park with Big Five and diverse wildlife.', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', 'Eastern Rwanda', 'Wildlife', '[-1.5833, 30.7333]'),
('mahama-landscape', 'Mahama Area Landscape', 'mahama-landscape', 'Rolling hills, tea plantations, and panoramic views of the Eastern Province.', 'Rolling hills and panoramic Eastern Province views.', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', 'Mahama Sector', 'Landscape', '[-2.2167, 30.55]');

INSERT IGNORE INTO accommodations (id, name, location, price_range, price_min, price_max, rating, image, description) VALUES
('1', 'Kirehe Lakeside Lodge', 'Near Lake Nasho', '$$', 40, 80, 4.5, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', 'Comfortable lodge with lake views.'),
('2', 'Rusumo Guest House', 'Rusumo Town', '$', 15, 35, 4.0, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600', 'Budget-friendly stay near Rusumo Falls.'),
('3', 'Eastern Plains Resort', 'Kirehe District', '$$$', 80, 150, 4.8, 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600', 'Upscale resort with safari experiences.'),
('4', 'Mahama View Hotel', 'Mahama Sector', '$$', 35, 65, 4.3, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600', 'Scenic hotel with hill and valley views.');

INSERT IGNORE INTO events (id, title, date, location, description, image) VALUES
('1', 'Kirehe Cultural Festival', '2025-06-15', 'Kirehe Town', 'Annual celebration of local culture with dance, music, food, and crafts.', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600'),
('2', 'Lake Nasho Bird Watching Weekend', '2025-04-20', 'Lake Nasho', 'Guided bird watching tours and nature walks around the lake.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600'),
('3', 'Rusumo Falls Heritage Day', '2025-07-01', 'Rusumo Falls', 'Commemoration and tours at the historic Rusumo border and waterfall.', 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600'),
('4', 'Harvest Festival - Umuganura', '2025-08-01', 'Various Sectors', 'Traditional Rwandan harvest celebration with local food and ceremonies.', 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600');

INSERT IGNORE INTO gallery (id, src, alt, category) VALUES
('1', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', 'Lake Nasho', 'Landscape'),
('2', 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600', 'Rusumo Falls', 'Nature'),
('3', 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600', 'Cultural dance', 'Culture'),
('4', 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600', 'Local market', 'Markets'),
('5', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600', 'Hills of Kirehe', 'Landscape'),
('6', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600', 'Wildlife', 'Nature'),
('7', 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600', 'Village life', 'Culture'),
('8', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600', 'Sunset', 'Landscape'),
('9', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600', 'Forest trail', 'Nature');

INSERT IGNORE INTO blog (id, title, excerpt, image, date, slug, author) VALUES
('1', '5 Must-See Spots in Kirehe District', 'From Lake Nasho to Rusumo Falls, discover the top attractions that make Kirehe a unique destination.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', '2025-02-10', '5-must-see-spots-kirehe', 'Visit Kirehe Team'),
('2', 'A Guide to Cultural Tourism in Eastern Rwanda', 'How to experience authentic Rwandan culture, dance, and cuisine in Kirehe and surrounding areas.', 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800', '2025-01-28', 'cultural-tourism-eastern-rwanda', 'Visit Kirehe Team'),
('3', 'Best Time to Visit Kirehe: Seasons and Wildlife', 'Plan your trip with our seasonal guide—when to see birds, enjoy boat rides, and avoid rain.', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', '2025-01-15', 'best-time-visit-kirehe', 'Visit Kirehe Team');

INSERT IGNORE INTO travel_info (id, transport, best_time, safety, tips) VALUES
(1, 'Buses and minibuses from Kigali. Private hire available.', 'June-September (dry), March-May (green).', 'Rwanda is safe. General travel advice applies.', 'Carry water, sunscreen, local currency (RWF).');

INSERT IGNORE INTO settings (id, site_name, contact_email, phone) VALUES
(1, 'Visit Kirehe', 'info@visitkirehe.rw', '+250785354935');

INSERT IGNORE INTO analytics (id, total_visitors, monthly_visitors, attraction_views, hotel_views) VALUES
(1, 0, '[]', '{}', '{}');

INSERT IGNORE INTO activities (id, title, description, icon, image, sort_order) VALUES
('nature', 'Nature Exploration', 'Hike through lush landscapes, spot birds and wildlife, and enjoy the serene beauty of Kirehe.', '🌿', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600', 1),
('cultural', 'Cultural Experiences', 'Meet local communities, learn traditional dance, taste authentic Rwandan cuisine, and hear local stories.', '🎭', 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600', 2),
('boat', 'Boat Rides', 'Enjoy peaceful boat trips on Lake Nasho and nearby water bodies with stunning views.', '🛶', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', 3),
('markets', 'Local Markets', 'Explore vibrant markets, buy crafts, fresh produce, and experience daily life in Kirehe.', '🛒', 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600', 4),
('village', 'Village Tourism', 'Visit traditional villages, participate in farming activities, and connect with local families.', '🏘️', 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600', 5),
('photography', 'Photography Spots', 'Capture breathtaking sunsets, landscapes, wildlife, and cultural moments across the district.', '📷', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600', 6);

INSERT IGNORE INTO testimonials (id, name, country, text, rating, avatar) VALUES
('1', 'Sarah M.', 'USA', 'Kirehe exceeded all expectations. Lake Nasho at sunset was magical, and the warmth of the local people made our trip unforgettable.', 5, 'https://i.pravatar.cc/100?img=1'),
('2', 'Jean-Pierre K.', 'Belgium', 'Rusumo Falls is a hidden gem. Combined with a visit to Akagera, this was the perfect Rwandan adventure.', 5, 'https://i.pravatar.cc/100?img=12'),
('3', 'Amara O.', 'Nigeria', 'The cultural experiences and village tourism in Kirehe gave us a real sense of Rwanda beyond the usual tourist trail. Highly recommend.', 5, 'https://i.pravatar.cc/100?img=5');
