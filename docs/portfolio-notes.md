# Portfolio Automation & AI Agent: Daniel Nguyen

> Tổng hợp từ transcript các Grok Bot agent (khoảng 200 tin gần nhất mỗi agent, tháng 10/2026). Chỉ ghi những gì có trong transcript. Bối cảnh: làm SEO / digital marketing cho HiAgency và các khách hàng (Hair Folli, LegalFinda, Everyday Clean, J.Aesthetic, MIS…).

---

## 1. Spidey Bot: Bot giám sát nội dung & báo cáo task cho team
**EN: Automated Content & Team-Report Monitoring Bot**
*Pitch: A scheduled bot that checks publishing freshness across 22 client channels and flags missing daily task reports to the team's Discord, with no manual follow-up needed.*

- **Vấn đề:** Phải tự đi kiểm tra kênh nào của khách lâu không đăng bài, và ai trong team chưa điền task report.
- **Automation:**
  - Script (`run.py`) đọc ngày đăng mới nhất trên 22 kênh (Blog, Facebook, Instagram, LinkedIn, GMB) của nhiều khách (everydayclean, legalfinda, jaesthetic, HiAgency…). Kênh nào quá 5 ngày không có bài thì báo vào group Discord lúc 10h.
  - Routine 16h40 từ T2 đến T6 đọc Google Sheet task report và chỉ báo những người bỏ trống cả 2 ngày làm việc đã qua (sửa logic để không tính ngày hôm nay).
  - Bật/tắt từng kênh theo yêu cầu (tạm bỏ blog LegalFinda khi site đang sửa technical). Xử lý việc SiteGround anti-bot trả HTTP 202/captcha cho API WordPress.
- **Kỹ năng:** Monitoring/alerting, lịch chạy theo ngày làm việc, tích hợp Discord, Google Sheets, WordPress REST API.

## 2. Upwork Agent: Tuyển freelancer SEO tự động
**EN: AI-Assisted Freelancer Sourcing on Upwork**
*Pitch: Drafted and posted a Programmatic SEO job, auto-reviewed and ranked 26 + 45 applicants, and sent free consultation invites, all at $0 spend.*

- Soạn job post "Programmatic SEO Specialist for Digital Agency (Hiagency)" và đăng lên Upwork gói miễn phí (bỏ qua gói Featured $29.99).
- Routine sáng hôm sau tự review **26 ứng viên** và xếp top 5 (rate, JSS, case study, có audit thử hiagency.au hay không).
- Gửi lời mời call tư vấn miễn phí cho 3 ứng viên (không thuê, không tốn tiền).
- Job "Senior Technical SEO Specialist": rà **45 ứng viên**, chọn top 5, gửi 3 người yêu cầu đánh giá miễn phí 3 site (legalfinda, hairfolli, everydayclean).
- **Kỹ năng:** Sourcing, sàng lọc ứng viên theo tiêu chí, browser automation, quản lý chi phí.

## 3. SEMRUSH check: Audit 1.818 site guest post
**EN: Bulk Guest-Post Vendor Audit (1,818 Sites)**
*Pitch: Audited a full vendor list of 1,818 guest-post sites, tiered them S–F, and filtered a prioritised 126-site "buy now" shortlist in Google Sheets.*

- Chạy kiểm tra toàn bộ **1.818/1.818 site** trong tab Business, xuất CSV hoàn chỉnh và dán vào tab "Guest Post Audit - Business".
- Phân hạng S/A/B…/F, đề xuất loại **686 site hạng F**, ưu tiên site có traffic Úc thật.
- Lọc shortlist **126 site** (16 "Mua ngay", 102 "Cân nhắc", 8 hạng B phụ), có cột ưu tiên và lý do.
- **Kỹ năng:** Xử lý dữ liệu lớn, đánh giá chất lượng backlink, ra quyết định dựa trên dữ liệu.

## 4. Backlink Hair Folli / J.Aesthetic / HiAgency: Hệ thống build & tracking citation
**EN: Local Citation Building & Backlink Tracking Pipeline**
*Pitch: Agents that submit business listings, audit confirmation emails, and keep backlink trackers 100% in sync across multiple brands.*

- **Hair Folli:** Đồng bộ "Backlink Tracker" với tab "Off-page Lists": sửa 25 dòng, thêm 79 dòng (19 live, 60 pending). Lọc mail duyệt/live ở 2 hộp thư rồi sửa thêm 45 dòng và thêm 4 dòng. Ghi nhận các listing mới live (LinkCentre, Find a Business, Pink Pages).
- **J.Aesthetic:** Tìm đường đăng free cho Cylex, AroundMe, iGlobal, Navmii, Snap Map (Navmii đi qua OpenStreetMap). Kích hoạt tài khoản InfoIsInfo, hoàn thiện profile lên 80%.
- **HiAgency:** Rà toàn bộ sheet backlink, kiểm tra từng link còn sống không và là dofollow hay nofollow (không có link chết). Xử lý xác minh SMS cho Cylex bằng số của sếp khi đã được đồng ý.
- **Kỹ năng:** Off-page SEO, local citations, đối soát dữ liệu email với sheet, quy trình làm việc có kiểm soát.

## 5. Hairfolli plan: Kế hoạch SEO 30/60/90 ngày
**EN: 90-Day SEO Plan (Technical / On-page / Off-page) in Google Sheets**
*Pitch: Built a 56-task, three-pillar SEO plan with auto-calculated progress, a trimmed off-page list, and clear team ownership.*

- Sheet mới có 3 tab Technical / On-page / Off-page, tổng **56 task**, tab Overview tự tính tiến độ.
- Cắt off-page còn **14 site free + 13 site guest post** cho vừa sức 1 người trong 90 ngày.
- Phân công: 1 thành viên team làm Technical + On-page, Daniel làm Off-page. Soạn mail gửi sếp, cc thành viên team đó. Tab Backlink Budget có cột trạng thái báo giá.
- **Kỹ năng:** Lập kế hoạch SEO, quản lý dự án, phân bổ nguồn lực.

## 6. Analysis: Phân tích đối thủ bằng DataForSEO + Semrush
**EN: Competitor Teardown Report (DataForSEO + Semrush)**
*Pitch: Pulled backlink data via API, crawled both sites, and produced a 16-page PDF explaining why a competitor wins on Google Maps, plus an action plan.*

- So sánh Sydney Commercial Cleaners với everydayclean.com.au. Chỉ dùng API DataForSEO cho phần backlink, còn content/cluster/on-page/local thì tự crawl.
- Đối chiếu với Semrush và tự sửa nhận định organic bị sai.
- Báo cáo **PDF 16 trang** (bìa, tóm tắt, bảng số liệu có nguồn, 3 biểu đồ). Kết luận: domain trùng đúng từ khóa (~180 keyword), listing Maps đặt ở CBD, **109 review 5★**. Rút ra 5 bài học cho Everyday Clean.
- **Kỹ năng:** Competitive analysis, dùng SEO API, viết báo cáo.

## 7. GMB Agents: Tối ưu Google Business Profile hàng loạt
**EN: Google Business Profile Optimisation & Audit**
*Pitch: Updated and audited multiple GBP listings (LegalFinda, HiAgency VN/AU, J.Aesthetic, Everyday Clean) with a safety-first, policy-aware approach.*

- LegalFinda: cập nhật mô tả, thêm danh mục phụ Conveyancer và Lawyer Referral Service theo hướng an toàn để tránh bị Google ban.
- J.Aesthetic: thêm **12 khóa học** có giá, xóa 4 service trùng, dọn emoji ở **33 tên service**.
- Audit "boost mode" 5 hồ sơ verified, phân loại rủi ro policy (ví dụ tên chèn keyword trên 4 hồ sơ).
- **Kỹ năng:** Local SEO, tuân thủ policy của Google, tự động hóa trên trình duyệt.

## 8. Schema validator: Debug structured data trên Shopify
**EN: Shopify Schema Markup Debugging**
*Pitch: Verified live structured data, traced product-schema errors to one line in a Liquid snippet, and prioritised fixes.*

- Test trang live: Organization, WebSite, BreadcrumbList hợp lệ. Phát hiện 2/6 bài blog có `description` trong BlogPosting bị rỗng.
- Đọc file theme và tìm ra cả 5 lỗi sản phẩm đều do dòng 12 của `snippets/product-schema.liquid`. Chỉ ra hướng dẫn gốc chỉ sai file.
- **Kỹ năng:** Technical SEO, schema.org, Shopify Liquid.

## 9. MIS: Discovery khách hàng → Questionnaire → Recap
**EN: Client Discovery Workflow (Google Forms + Recap Email)**
*Pitch: Turned a discovery call with an international school into a tailored Google Form questionnaire and a recap email, iterated on manager feedback.*

- Khách: Montessori International School of Vietnam (3 campus). Nhu cầu: SEO, hiển thị trên ChatGPT/AI, LinkedIn.
- Tạo và sửa Google Form qua Apps Script, giữ nguyên link. Qua nhiều vòng còn 12 rồi 14 rồi 17 câu theo góp ý của sếp (ngân sách 4k/7k/10k+ USD, số chỗ trống theo từng campus…).
- Soạn mail recap gửi sếp kèm PDF và bản tóm tắt các chỗ đã update bằng tiếng Anh.
- **Kỹ năng:** Account management, thiết kế khảo sát, Google Apps Script.

## 10. AI Influencer & Lưu Lại: Content engine cho @leo_aimarketing
**EN: AI Influencer Content Pipeline (Reels & Carousels)**
*Pitch: An AI persona "Leo" producing Instagram reels and carousels, from idea capture and script to Grok Imagine clips and ChatCut edits.*

- "Lưu Lại": lưu reel Instagram rồi nhắc lúc 9h. Tải reel về, phân tích ý tưởng (mẹo `site:` tìm internal link), viết script 20s 9:16, quay 5 cảnh demo trên hairfolli.com, tạo clip Leo bằng Grok Imagine, dựng timeline trên ChatCut.
- "AI Influencer": carousel 5 slide style Van Gogh (1080x1350), caption kèm hashtag. Reel "AI Employees" ~28s. Reel OpenSEO 25s 9:16 (repo 24.2K⭐) có CTA "Comment SEO", đẩy lên ChatCut. Có routine proactive định kỳ.
- **Kỹ năng:** Content automation, AI video/image, short-form marketing.

## 11. Nghiên cứu & công cụ phụ
**EN: Research Utilities (Backlink Source Lists, Vocab Lock-screen Widget, Vendor Review)**
*Pitch: Quick research agents that turn repos, PDFs and ideas into usable files and decisions.*

- Phân tích repo Backlink Pilot: lọc ra **180 site submit tự động**, làm file 24 dạng backlink xếp tier S–D, rồi file **199 site free tự đăng được** có link sign up.
- Review PDF kế hoạch SEO của Admiral Studios cho Hair Folli, đối chiếu với site thật.
- Giải pháp học từ vựng trên màn hình khóa iPhone bằng Scriptable widget (162 từ, lấy từ `words.json`).

---
*Agent thử nghiệm không có kết quả: New Bot 704c (thử mở Muse qua proxy US, không thành, đã xóa profile tạm).*
