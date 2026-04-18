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
        badge: "Designed for Namma Karnataka • Enterprise Edition",
        title1: "Zero Hunger.",
        title2: "Infinite Impact.",
        subtitle: "The professional logistics network for surplus food allocation across Bengaluru and beyond. Seamlessly route verified donations to NGOs with military-grade precision and real-time tracing.",
        donateBtn: "Start Donating",
        apiBtn: "Partner API Access",
        featuresTitle: "Built for Karnataka",
        featuresSub: "Advanced metrics and unbreakable security infrastructure for our State.",
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
        badge: "फूडकनेक्ट एंटरप्राइज़: नम्मा कर्नाटक के लिए डिज़ाइन किया गया",
        title1: "शून्य भुखमरी।",
        title2: "अनंत प्रभाव।",
        subtitle: "बेंगलुरु और उससे आगे अतिरिक्त भोजन आवंटन के लिए रसद नेटवर्क। सैन्य स्तर की सटीकता और वास्तविक समय की निगरानी के साथ एनजीओ को सत्यापित दान भेजें।",
        donateBtn: "दान शुरू करें",
        apiBtn: "भागीदार एपीआई पहुंच",
        featuresTitle: "कर्नाटक के लिए निर्मित",
        featuresSub: "उन्नत मेट्रिक्स और हमारे राज्य के लिए अटूट सुरक्षा बुनियादी ढांचा।",
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
        login: "ಲಾಗಿನ್ (Login)",
        donorPortal: "ದಾನಿ ಪೋರ್ಟಲ್",
        receiverPortal: "ಸ್ವೀಕರಿಸುವವರ ಪೋರ್ಟಲ್",
        adminPortal: "ಮಹಾನಿರ್ವಾಹಕ",
      },
      home: {
        badge: "ನಮ್ಮ ಕರ್ನಾಟಕಕ್ಕಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ • ಎಂಟರ್‌ಪ್ರೈಸ್ ಆವೃತ್ತಿ",
        title1: "ಹಸಿವು ಮುಕ್ತ ನಾಡು.",
        title2: "ಅನಂತ ಪ್ರಭಾವ.",
        subtitle: "ಬೆಂಗಳೂರು ಮತ್ತು ರಾಜ್ಯಾದ್ಯಂತ ಹೆಚ್ಚುವರಿ ಆಹಾರ ಹಂಚಿಕೆಗಾಗಿ ಮೀಸಲಾದ ಟೆಕ್-ನೆಟ್‌ವರ್ಕ್. ಕರಾರುವಾಕ್ಕಾದ ನೈಜ-ಸಮಯದ ಟ್ರ್ಯಾಕಿಂಗ್‌ನೊಂದಿಗೆ ಎನ್‌ಜಿಒಗಳಿಗೆ ಆಹಾರವನ್ನು ತಕ್ಷಣವೇ ತಲುಪಿಸಿ.",
        donateBtn: "ದಾನ ಮಾಡಲು ಪ್ರಾರಂಭಿಸಿ",
        apiBtn: "NGO ಪಾಲುದಾರರು",
        featuresTitle: "ನಮ್ಮ ಕರ್ನಾಟಕದ ಹೆಮ್ಮೆ",
        featuresSub: "ನಮ್ಮ ರಾಜ್ಯಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾದ ಅತ್ಯಾಧುನಿಕ ಡಿಜಿಟಲ್ ಭದ್ರತಾ ಮೂಲಸೌಕರ್ಯ.",
        f1Title: "ನೈಜ-ಸಮಯದ ಮ್ಯಾಪಿಂಗ್",
        f1Desc: "ನಮ್ಮ ಸ್ಥಳೀಯ AI ಎಂಜಿನ್ ಲೈವ್ ಎನ್‌ಜಿಒ ಸಾಮೀಪ್ಯ ಡೇಟಾವನ್ನು ತಕ್ಷಣವೇ ಹೊಂದಿಸುತ್ತದೆ.",
        f2Title: "ಪರಿಶೀಲಿಸಿದ ನೆಟ್ವರ್ಕ್",
        f2Desc: "ನಿಮ್ಮ ದೇಣಿಗೆಗಳು ಅಧಿಕೃತ ಸರ್ಕಾರೇತರ ಸಂಸ್ಥೆಗಳನ್ನು ತಲುಪುವುದನ್ನು ಕಟ್ಟುನಿಟ್ಟಾದ KYC ಖಚಿತಪಡಿಸುತ್ತದೆ.",
        f3Title: "ಕಾರ್ಬನ್ ಅನಾಲಿಟಿಕ್ಸ್",
        f3Desc: "ಭೂಮಿಗೆ ಸೇರುವ ಹಸಿರುಮನೆ ಅನಿಲವನ್ನು ತಡೆಗಟ್ಟುವ ನಿಖರವಾದ ESG ವರದಿ ವ್ಯವಸ್ಥೆ."
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
