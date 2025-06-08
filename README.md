# Portfolio Generator

Một hệ thống đơn giản để tạo landing page portfolio từ file YAML configuration.

## Cách sử dụng

### 1. Cài đặt dependencies

```bash
pip install -r requirements.txt
```

### 2. Chỉnh sửa thông tin cá nhân

Mở file `data.yaml` và cập nhật thông tin của bạn:

```yaml
personal:
  name: "Tên của bạn"
  title: "Chức vụ"
  location: "Địa chỉ"
  email: "email@example.com"
  phone: "Số điện thoại"
  # ... các thông tin khác
```

### 3. Generate website

Chạy script để tạo ra file HTML và JavaScript:

```bash
python generate.py
```

### 4. Xem kết quả

Mở file `index.html` trong trình duyệt để xem portfolio của bạn.

## Cấu trúc file

- `data.yaml` - File cấu hình chứa tất cả thông tin cá nhân
- `generate.py` - Script Python để generate HTML và JS
- `style.css` - File CSS (không cần thay đổi)
- `index.html` - File HTML được generate (không chỉnh sửa trực tiếp)
- `script.js` - File JavaScript được generate (không chỉnh sửa trực tiếp)

## Các phần có thể tùy chỉnh trong data.yaml

### Personal Information
- `name`: Tên đầy đủ
- `title`: Chức vụ hiện tại
- `location`: Địa chỉ
- `email`: Email liên hệ
- `phone`: Số điện thoại
- `resume_file`: Tên file CV
- `username`: Username cho terminal
- `terminal_name`: Tên terminal

### Social Links
- `linkedin`, `github`, `telegram`, `gitlab`, `bitbucket`, `stackoverflow`

### Skills
Chia thành các category:
- `programming`: Ngôn ngữ lập trình
- `cicd_automation`: CI/CD & Automation
- `operating_systems`: Hệ điều hành
- `containers_virtualization`: Containers/Virtualization
- `databases`: Cơ sở dữ liệu
- `cloud_platforms`: Nền tảng cloud
- `networking`: Mạng
- `monitoring_logging`: Monitoring/Logging
- `security`: Bảo mật
- `registry_proxy`: Registry & Proxy

### Experience
Danh sách kinh nghiệm làm việc:
```yaml
- company: "Tên công ty"
  position: "Vị trí"
  period: "Thời gian"
  description: "Mô tả công việc"
```

### Projects
Danh sách dự án:
```yaml
- title: "Tên dự án"
  description: "Mô tả dự án"
```

### Achievements
Danh sách thành tích và chứng chỉ

### Available For & Hire Reasons
Các vị trí mong muốn và lý do nên tuyển dụng

## Lợi ích

✅ **Dễ bảo trì**: Chỉ cần chỉnh sửa file YAML  
✅ **Tự động hóa**: Chạy 1 lệnh để generate toàn bộ website  
✅ **Nhất quán**: Đảm bảo format và style đồng nhất  
✅ **Tiết kiệm thời gian**: Không cần chỉnh sửa HTML/JS phức tạp  
✅ **Dễ backup**: Chỉ cần backup file YAML  

## Workflow thông thường

1. Chỉnh sửa `data.yaml`
2. Chạy `python generate.py`
3. Mở `index.html` để xem kết quả
4. Repeat khi cần cập nhật thông tin

Bây giờ bạn có thể dễ dàng cập nhật portfolio chỉ bằng cách chỉnh sửa file YAML! 🚀