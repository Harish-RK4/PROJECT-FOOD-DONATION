import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        login: "Login",
        donorPortal: "Donor Portal",
        receiverPortal: "Receiver Portal",
        adminPortal: "SysAdmin",
      },
      home: {
        badge: "FoodConnect Enterprise Edition 1.0",
        title1: "Zero Hunger.",
        title2: "Infinite Impact.",
        subtitle: "The professional logistics network for surplus food allocation. Seamlessly route verified donations to NGOs with military-grade precision and real-time tracing.",
        donateBtn: "Start Donating",
        apiBtn: "Partner API Access",
        featuresTitle: "Built for Global Scale",
        featuresSub: "Advanced metrics and unbreakable security infrastructure.",
        f1Title: "Real-Time Routing",
        f1Desc: "Our AI engine matches food volatility with live NGO proximity data instantly.",
        f2Title: "Verified Network",
        f2Desc: "Rigorous KYC checks ensure your donations reach legally authorized endpoints.",
        f3Title: "Carbon Analytics",
        f3Desc: "Automated ESG compliance reporting detailing exact greenhouse gas diversion."
      }
    }
  },
  hi: {
    translation: {
      nav: {
        login: "लॉग इन",
        donorPortal: "दाता पोर्टल",
        receiverPortal: "प्राप्तकर्ता पोर्टल",
        adminPortal: "प्रशासक",
      },
      home: {
        badge: "फूडकनेक्ट एंटरप्राइज़ संस्करण 1.0",
        title1: "शून्य भुखमरी।",
        title2: "अनंत प्रभाव।",
        subtitle: "अतिरिक्त भोजन आवंटन के लिए पेशेवर रसद नेटवर्क। सैन्य स्तर की सटीकता और वास्तविक समय की निगरानी के साथ एनजीओ को सत्यापित दान भेजें।",
        donateBtn: "दान शुरू करें",
        apiBtn: "भागीदार एपीआई पहुंच",
        featuresTitle: "वैश्विक पैमाने के लिए निर्मित",
        featuresSub: "उन्नत मेट्रिक्स और अटूट सुरक्षा बुनियादी ढांचा।",
        f1Title: "तत्काल रूटिंग",
        f1Desc: "हमारा एआई इंजन भोजन की अस्थिरता को एनजीओ के स्थानीय डेटा के साथ तुरंत जोड़ता है।",
        f2Title: "सत्यापित नेटवर्क",
        f2Desc: "सख्त केवाईसी जांच सुनिश्चित करती है कि आपका दान कानूनी रूप से अधिकृत अंतिम बिंदु तक पहुंचे।",
        f3Title: "कार्बन विश्लेषिकी",
        f3Desc: "ग्रीनहाउस गैस विचलन का सटीक विवरण देने वाली स्वचालित ईएसजी अनुपालन रिपोर्टिंग।"
      }
    }
  },
  kn: {
    translation: {
      nav: {
        login: "ಲಾಗಿನ್",
        donorPortal: "ದಾನಿ ಪೋರ್ಟಲ್",
        receiverPortal: "ಸ್ವೀಕರಿಸುವವರ ಪೋರ್ಟಲ್",
        adminPortal: "ನಿರ್ವಾಹಕ",
      },
      home: {
        badge: "ಫುಡ್‌ಕನೆಕ್ಟ್ ಎಂಟರ್‌ಪ್ರೈಸ್ ಆವೃತ್ತಿ 1.0",
        title1: "ಶೂನ್ಯ ಹಸಿವು.",
        title2: "ಅನಂತ ಪ್ರಭಾವ.",
        subtitle: "ಹೆಚ್ಚುವರಿ ಆಹಾರ ಹಂಚಿಕೆಗಾಗಿ ವೃತ್ತಿಪರ ಲಾಜಿಸ್ಟಿಕ್ಸ್ ನೆಟ್‌ವರ್ಕ್. ನೈಜ-ಸಮಯದ ಟ್ರ್ಯಾಕಿಂಗ್‌ನೊಂದಿಗೆ ಎನ್‌ಜಿಒಗಳಿಗೆ ಪರಿಶೀಲಿಸಿದ ದೇಣಿಗೆಗಳನ್ನು ಮನಬಂದಂತೆ ರವಾನಿಸಿ.",
        donateBtn: "ದಾನವನ್ನು ಪ್ರಾರಂಭಿಸಿ",
        apiBtn: "ಪಾಲುದಾರ API ಪ್ರವೇಶ",
        featuresTitle: "ಜಾಗತಿಕ ಮಟ್ಟಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ",
        featuresSub: "ಸುಧಾರಿತ ಮೆಟ್ರಿಕ್‌ಗಳು ಮತ್ತು ಮುರಿಯಲಾಗದ ಭದ್ರತಾ ಮೂಲಸೌಕರ್ಯ.",
        f1Title: "ನೈಜ-ಸಮಯದ ರೂಟಿಂಗ್",
        f1Desc: "ನಮ್ಮ AI ಎಂಜಿನ್ ಲೈವ್ ಎನ್‌ಜಿಒ ಸಾಮೀಪ್ಯ ಡೇಟಾವನ್ನು ತಕ್ಷಣವೇ ಹೊಂದಿಸುತ್ತದೆ.",
        f2Title: "ಪರಿಶೀಲಿಸಿದ ನೆಟ್ವರ್ಕ್",
        f2Desc: "ನಿಮ್ಮ ದೇಣಿಗೆಗಳು ಕಾನೂನುಬದ್ಧವಾಗಿ ಅಧಿಕೃತ ಅಂತಿಮ ಬಿಂದುಗಳನ್ನು ತಲುಪುವುದನ್ನು ಕಟ್ಟುನಿಟ್ಟಾದ KYC ಖಚಿತಪಡಿಸುತ್ತದೆ.",
        f3Title: "ಕಾರ್ಬನ್ ಅನಾಲಿಟಿಕ್ಸ್",
        f3Desc: "ನಿಖರವಾದ ಹಸಿರುಮನೆ ಅನಿಲ ತಿರುವುಗಳನ್ನು ವಿವರಿಸುವ ಸ್ವಯಂಚಾಲಿತ ESG ವರದಿ."
      }
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
