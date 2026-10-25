Avşar Boutique Hotel — Mediterranean Luxury
Tasarım yönü seçildi
Web sitesi tasarım ve geliştirme planı · v1.0

Yeni sitenin temel fikri şu olacak: Antalya'nın falez manzarasını, butik otelin sıcaklığını ve modern bir Akdeniz lüksünü birleştiren dijital deneyim.

Mevcut sitedeki altı oda kategorisini, Dialogue Coffee & Kitchen'ı, deniz manzarasını ve online rezervasyon altyapısını koruyacağız. Ancak görsel dili, sayfa hiyerarşisini ve mobil deneyimi baştan tasarlayacağız. 

hotelavsar.com
+1



1. Ana sayfanın görsel konsepti
Seçilen tasarım kimliği

#142C3B


#F6F2EB


#C2A47C


#5C8C9D


#FFFFFF


Elegance by the Sea
Cormorant Garamond + Manrope



Ana sayfanın açılış ekranında gerçek otel ve deniz manzarasını kullanan büyük bir görsel, üzerinde zarif tipografi ve hemen altında rezervasyon alanı bulunacak. Mobilde ise ekrandan taşmayan, tek elle rahat kullanılan bir yapı kuracağız.
Bu görsel tasarım konseptidir; fotoğraflar temsili olarak oluşturulmuştur. Gerçek web sitesinde otelin özgün fotoğraflarını, doğrulanmış iletişim bilgilerini ve gerçek oda özelliklerini kullanacağız.Ana sayfa tasarımını tam boy aç
2. Ana sayfanın bölüm bölüm planı
01

Header & Navigasyon

Krem arka plan, sol tarafta logo, merkezde menü, sağda dil değişimi ve koyu lacivert Rezervasyon butonu. Aşağı kaydırıldığında ince sticky header.


02

Hero — Akdeniz'in Kalbinde

Ekran genişliğinde gerçek drone fotoğrafı veya kısa video. Sol tarafta büyük serif başlık. Masaüstünde 75–90vh, mobilde daha kompakt düzen.


03

Rezervasyon Alanı

Giriş tarihi, çıkış tarihi, misafir sayısı ve Müsaitlik Sorgula. Entegrasyon doğrulanana kadar resmî rezervasyon sistemine güvenilir yönlendirme.


04

Otel Tanıtımı

Sol tarafta editoryal başlık ve kısa hikâye, sağda 1 büyük + 2 küçük özgün fotoğraf. Krem zemin ve geniş boşluklar.


05

Odalarımız

Masaüstünde üç büyük oda kartı; mobilde yatay kaydırılabilir kartlar. Altı oda arasından öne çıkan üçü seçilecek.


06

Dialogue Coffee & Kitchen

Tam genişlikte gerçek restoran ve manzara fotoğrafı. Kısa tanıtım, zarif koyu geçiş ve Keşfet bağlantısı.


07

Deneyimler

Havuz, SPA, kahvaltı ve Lara konumu için sade ikonlar ve kısa açıklamalar. Doğrulanmış hizmetler gösterilecek.


08

Galeri & Misafir Yorumları

Asimetrik fotoğraf galerisi; kaynağı doğrulanmış gerçek misafir yorumları. Sahte puan veya metrik eklenmeyecek.


09

Son Rezervasyon Çağrısı

Deniz manzaralı geniş görsel alan; kısa davet metni ve görünür Rezervasyon Yap butonu.


10

Footer

Logo, adres, telefon, e-posta, hızlı menüler, sosyal medya, dil seçimi ve yasal bağlantılar.



3. Claude geliştirme sıralaması
Tüm siteyi tek komutta üretmek yerine sekiz aşamada ilerleyelim. Böylece tasarımın sayfalarda tutarlı kalmasını, kodların hatasız bütünleşmesini ve değişikliklerin kolay yapılmasını sağlayabiliriz.
1. Proje altyapısı ve tasarım sistemi
   
   Next.js kurulumu, Tailwind, fontlar, renkler, ortak bileşenler, dil altyapısı, header ve footer.
2. Ana sayfa
   
   Yukarıdaki görseli referans alan, tüm bölümleri ve mobil düzeni tamamlanmış ana sayfa.
3. Odalar sayfası ve altı oda detayı
   
   Oda verileri ortak dosyadan yönetilecek. Fotoğraf galerisi, yatak bilgisi, kapasite ve rezervasyon bağlantıları.
4. Dialogue Coffee & Kitchen
   
   Restoran tanıtımı, kahvaltı, mekân fotoğrafları, varsa doğrulanmış menü bilgileri ve iletişim.
5. Deneyimler ve Galeri
   
   Havuz, SPA, diğer olanaklar; kategorilere ayrılabilen fotoğraf galerisi ve lightbox.
6. Hakkımızda, Antalya Rehberi, İletişim
   
   Otel hikâyesi, yakındaki yerler, harita, iletişim bağlantıları ve spam korumalı form.
7. Rezervasyon, dil ve SEO
   
   Resmî rezervasyon yönlendirmeleri, TR/EN/DE/RU çevirileri, schema.org, site haritası ve eski URL yönlendirmeleri.
8. Test, optimizasyon ve yayın
   
   Mobil kontroller, erişilebilirlik, görsel optimizasyonu, build testleri, GitHub, Vercel ve alan adı bağlantısı.

4. Claude için ilk geliştirme komutu
Aşağıdaki komutla başlayacağız. Bu aşamada Claude önce proje iskeletini ve ortak tasarım bileşenlerini kuracak. Henüz diğer sayfaların içeriğini üretmeyecek.
AVŞAR BOUTIQUE HOTEL — PHASE 1
You are a senior frontend engineer and luxury hospitality web designer.

We are rebuilding https://hotelavsar.com/ as a modern premium boutique hotel website.

The chosen visual direction is Mediterranean Luxury.

Use the homepage design reference supplied separately. It defines the visual aesthetic, spacing, typography, colors, and overall layout. The image is a conceptual mockup, not a source of factual hotel information or production photographs.
Technology
- Next.js App Router with TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- Motion for React (current supported Framer Motion package)
- next-intl for internationalization
- Next.js Image
- Vercel deployment
Use current stable and compatible package versions.
Design tokens
Primary Navy: #142C3B
Warm Ivory: #F6F2EB
Sand Gold: #C2A47C
Mediterranean Blue: #5C8C9D
White: #FFFFFF

Heading font: Cormorant Garamond
Body font: Manrope

Design language:
- Large editorial headings
- Generous whitespace
- Minimal borders and shadows
- Premium hospitality aesthetics
- Soft and restrained animations
- Real hotel photography only
- Responsive from mobile to ultra-wide desktop
Hotel identity
Name: Avşar Boutique Hotel

Location: Şirinyalı, Muratpaşa, Antalya, Türkiye

Existing website:
https://hotelavsar.com/

Official booking website:
https://avsarhotel.rezervasyonal.com/

Main differentiators:
- Mediterranean sea views
- Antalya Lara location
- Boutique hotel accommodations
- Dialogue Coffee & Kitchen
- Pool and wellness facilities
Verify hotel facts before publishing them. Keep unverified information in editable content files instead of hardcoding it.
Required architecture
Create a clean project with:
- app/[locale]/ routes
- components/layout/
- components/home/
- components/rooms/
- components/booking/
- components/ui/
- data/
- lib/
- messages/
- public/images/
- public/videos/
- styles/
Use semantic HTML, accessible controls, keyboard navigation, and reduced-motion support.
Internationalization
Prepare four locales:
- tr (default)
- en
- de
- ru
Use localized routes, such as /tr and /en.

All user-facing strings must come from translation resources.
Phase 1 deliverables
1. Full project structure
2. Package dependencies and configuration
3. Tailwind theme and design tokens
4. Global styles and typography
5. Responsive header and mobile navigation
6. Language selector
7. Reusable button, section, container, and typography components
8. Responsive footer
9. Initial content data structure
10. Placeholder home route with working layout
11. Development and deployment instructions
Do not build the complete homepage or internal pages yet.

Provide complete file contents, not pseudocode.

Ensure there are no missing imports or incompatible packages.

After implementation, run TypeScript, lint, and production build checks, and fix any errors.

Explain which files were created and what is ready for Phase 2.




5. Claude için ikinci komut — ana sayfanın uygulanması
Birinci aşama tamamlandıktan sonra bunu vereceğiz:
AVŞAR BOUTIQUE HOTEL — PHASE 2: HOMEPAGE
Continue from the existing Phase 1 project. Do not replace the architecture or rewrite working shared components unnecessarily.

Implement the complete homepage using the approved Mediterranean Luxury visual reference.

Build the following components in this order:
1. HeroSection
2. BookingBar
3. HotelIntroduction
4. FeaturedRooms
5. DialogueSection
6. ExperiencesSection
7. PhotoGalleryPreview
8. TestimonialsSection
9. FinalBookingCTA
Visual requirements
The homepage must closely follow the approved reference design in visual hierarchy, typography, spacing, color palette, image proportions, and overall luxury boutique hotel aesthetic.

The hero should use a real hotel photograph when available. Keep image paths configurable in a central asset manifest.

Never substitute generated architecture or unrelated stock hotel photographs as if they depict Avşar Boutique Hotel.

If a production photograph is unavailable, use a clearly labeled neutral development placeholder without fabricated hotel imagery.

Use an elegant but restrained animation system. Avoid excessive parallax and slow-loading effects.
Booking behavior
The booking CTA must function.

Use the official reservation URL:
https://avsarhotel.rezervasyonal.com/

Do not fabricate booking API functionality or URL parameters.

If arrival, departure, and guest-count parameters cannot be confirmed, the button should open the official booking engine without pretending the selected values have been transmitted.
Responsive design
Desktop: elegant multi-column editorial sections.

Tablet: adaptive content grids with appropriate spacing.

Mobile:
- Single-column layout
- Readable hero typography
- Compact booking widget
- Touch-friendly menus and buttons
- Image galleries that work without hover
- Optional sticky Book Now action that does not obstruct content
Performance
- Prioritize hero loading
- Lazy-load images below the fold
- Use optimized image formats
- Avoid layout shifts
- Respect reduced-motion preferences
Acceptance criteria
- All homepage sections implemented
- All navigational and CTA controls functional
- Translations loaded correctly for TR, EN, DE, RU
- No horizontal overflow on mobile
- No console errors
- Accessible interactions
- TypeScript and production build pass
Create complete working code using the existing project files.

At the end, report files created or updated and any missing real hotel assets.




6. Önerilen dosya yapısı
avsar-boutique-hotel/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx
│   │   ├── rooms/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── dialogue/page.tsx
│   │   ├── experiences/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── about/page.tsx
│   │   ├── antalya-guide/page.tsx
│   │   ├── contact/page.tsx
│   │   └── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/
│   ├── home/
│   ├── rooms/
│   ├── booking/
│   └── ui/
├── data/
│   ├── hotel.ts
│   ├── rooms.ts
│   ├── experiences.ts
│   └── media.ts
├── lib/
│   ├── booking.ts
│   └── seo.ts
├── messages/
│   ├── tr.json
│   ├── en.json
│   ├── de.json
│   └── ru.json
├── public/
│   ├── images/
│   │   ├── hotel/
│   │   ├── rooms/
│   │   ├── dialogue/
│   │   └── gallery/
│   └── videos/
└── styles/
    └── globals.css


7. Fotoğraf planı
Bu projede sitenin kalitesini en fazla etkileyecek konu fotoğraflar. Mevcut sitede oda, otel dış cephesi, gece görünümü ve drone çekimlerinden oluşan bir galeri zaten bulunuyor. 

hotelavsar.com




İlk etapta aşağıdaki görsellerin orijinal dosyalarını toparlayalım:
Görsel	Kullanım	Önerilen çözünürlük
Deniz manzaralı drone	Ana hero	1920×1080 veya üzeri
Otel dış cephe	Hakkımızda	1600×1100
Altı oda tipi	Oda kartları ve detayları	1600×1100
Dialogue manzara	Tam genişlik restoran bölümü	1920×1080
Kahvaltı	Restoran sayfası	1400×1000
Havuz	Deneyimler	1600×1100
Gece otel fotoğrafı	Galeri veya kapanış CTA	1920×1080

İkinci aşamada, otelin elinde profesyonel drone videosu varsa ana ekranda kullanabiliriz. Yoksa kaliteli, doğru kadrajlanmış tek bir fotoğraf yeterli olur.
8. Geliştirme sırasında takip edeceğimiz kontrol listesi
Yayına hazırlık

0/8



[ ] Logo ve kurumsal kimlik dosyaları
[ ] Orijinal otel drone fotoğrafı
[ ] Altı oda tipinin fotoğrafları
[ ] Dialogue restoran fotoğrafları
[ ] Gerçek iletişim bilgileri
[ ] Oda kapasiteleri ve özellikleri
[ ] Rezervasyon motoru yönlendirme testi
[ ] Dört dil için metin kontrolü

Benim önerim: Şimdi tasarımı değiştirmeden önce Claude'a birinci komutu verip iskeleti oluşturalım. Ana sayfa mockup'ını da görsel referans olarak ekleyelim. Birinci aşama tamamlandıktan sonra ikinci komutla gerçek fotoğrafları yerleştirerek ana sayfayı oluşturalım.

Bu şekilde hem tasarım bütünlüğünü koruruz hem de daha sonra odaları, restoranı ve içerikleri yönetmek çok daha kolay olur.