import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).use(initReactI18next).init({
  lng: "",
  resources: {
    en: {
      translation: {
        // homepage.jsx 113-114
        News: "News",
        BlogPosts: "From Our Blog Post",
        // homepage.jsx 130-134
        PEFT1title: "2 Parameter-efficient Fine-tuning(PEFT) techniques for LLM: LoRA and QLoRA (Part 1)",
        PEFT1text: "A Large Language Model (LLM) is an AI algorithm that uses neural networks to understand and generate human language.",
        // homepage.jsx 142-149
        PEFT2title: "2 Parameter-efficient Fine-tuning(PEFT) techniques for LLM: LoRA and QLoRA (Part 2)",
        PEFT2text: "As you have LoRA, you can train your model faster, but there are some models so large that you can not even load it if you don’t have extended resource(e.g. Llama). Don’t worry, QLoRA can help you lighten the model by quantization technique so that you can try more LLM.",
        // homepage.jsx 159-161
        Fintech: "Applications of Fintech",
        Fintechtext: "Fintech, also known as financial technology, is an application, software or technology that allows users or to access, manage, or have insight into their finances.",
        // homepage.jsx 159-161
        FintechTrend: "Financial Technology Trends: Grab to Grow",
        FintechTrendtext: "Along with the development of the Industrial Revolution 4, more and more consumers are using products and services from Fintech. However, along with the development opportunities, Fintech in Vietnam is still no less difficult, challenging.",
        // homepage.jsx 190-191
        Aboutus: "About us",
        Content: "Content",
        Moredetails: "More details",
        // homepage.jsx 214,215,218
        OTW: "Our news on the way",
        Signup1st: "Sign up to be the first to know what's new in our home",
        Notifyme: "Notify me",
        // Chat.jsx 809
        Menuchat: "Menu chat",
        // Chat.jsx 823
        Listfile: "List file",
        // Chat.jsx 851
        History: "History",
        // Chat.jsx 866, 918, 987
        Feedback: "FeedBack",
        // Chat.jsx 881
        Reload: "Do you want reload session?",
        // Chat.jsx 890,899
        No: "No",
        Yes: "Yes",
        // Chat.jsx 923-926
        Openmenu: "Open this select menu",
        One: "One",
        Two: "Two",
        Three: "Three",
        // Chat.jsx 966
        Send: "Send",
        // Chat.jsx 981
        Close: "Close",
        // Chat.jsx 981, 1557
        Chat: "Chat",
        // Chat.jsx 981
        NewChat: "New Chat",
        // Chat.jsx 1531
        Predict: "Predict",
        // Chat.jsx 1581
        Regenerate: "Regenerate",
        // Chat.jsx 1787
        UploadFile: "Upload File",
        // Chat.jsx 1810
        UploadFolder: "Upload Folder",


      }
    },
    vi: {
      translation: {
        // homepage.jsx 113-114
        News: "Tin tức",
        BlogPosts: "Blog của chúng tôi",
        // homepage.jsx 130-134
        PEFT1title: "2 kĩ thuật Parameter-effecient Fine-tuning(PEFT) cho LLM: LoRA và QLoRA (Phần 1)",
        PEFT1text: "Một mô hình Large Language Model (LLM) là một thuật toán AI sử dụng mạng nơ ron nhân tạo để có thể hiểu và sinh ra ngôn ngữ của con người.",
        // homepagge.jsx 142-149
        PEFT2title: "2 kĩ thuật Parameter-effecient Fine-tuning(PEFT) cho LLM: LoRA và QLoRA (Phần 2)",
        PEFT2text: "Khi sử dụng LoRA, bạn có thể huấn luyện mô hình nhanh hơn, nhưng có một vài mô hình lớn đến nỗi mà không thể tải nó lên nếu không có những nguồn mở rộng thêm (Vd: LLaMA). Đừng lo bởI vì QLoRA sẽ khai sáng cho mô hình của bạn với kĩ thuật quantization để bạn có thể thử với nhiều mô hình LLM hơn.",
        // homepagge.jsx 159-161
        Fintech: "Ứng dụng của Fintech",
        Fintechtext: "Fintech, còn được biết đến vớI cái tên công nghệ tài chính, là một ứng dụng, phần mềm hay công ngghệ có thể cho phép người dùng.",
        // homepage.jsx 159-161
        FintechTrend: "Xu hướng công nghệ tài chính: Nắm bắt để tăng trưởng",
        FintechTrendtext: "Hoà nhịp với sự phá triển của thời đại công nghệ 4.0, ngày càng nhiều khách hàng sử dụng các sản phẩm và dịch vụ của Fintech. Tuy có nhiều cơ hội phát triển nhưng Fintech tại Việt Nam cũng gặp không ít những thách thức, khó khăn.",
        // homepage.jsx 190-191,198
        Aboutus: "Về chúng tôi",
        Content: "Nội dung",
        Moredetails: "Chi tiết",
        // homepage.jsx 214,215,218
        OTW: "Tin tức luôn được cập nhật",
        Signup1st: "Đăng ký ngay để là người đầu tiên nhận đƯợc tin mới nhất từ chúng tôi",
        Notifyme: "Thông báo cho tôi",
        // Chat.jsx 809
        Menuchat: "Danh sách chat",
        // Chat.jsx 823
        Listfile: "Danh sách file",
        // Chat.jsx 851
        History: "Lịch sử",
        // Chat.jsx 866, 918, 987
        Feedback: "Nhận xét",
        // Chat.jsx 881
        Reload: "Bạn có muốn tải lại phiên này?",
        // Chat.jsx 890,899
        No: "Không",
        Yes: "Có",
        // Chat.jsx 923-926
        Openmenu: "Mở danh sách này",
        One: "Một",
        Two: "Hai",
        Three: "Ba",
        // Chat.jsx 966
        Send: "Gửi",
        // Chat.jsx 981
        Close: "Đóng",
        // Chat.jsx 981, 1557
        Chat: "Nhắn",
        // Chat.jsx 981
        NewChat: "Tin nhắn mới",
        // Chat.jsx 1531
        Predict: "Dự đoán",
        // Chat.jsx 1581
        Regenerate: "Tạo lại",
        // Chat.jsx 1787
        UploadFile: "Gửi tài liệu",
        // Chat.jsx 1810
        UploadFolder: "Gửi thư mục",
      }
    }
  },
  keySeparator: false,
  interpolation: { escapeValue: false }
}

);

export default i18n;
