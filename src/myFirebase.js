import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    // REACT_APP_ : 환경 변수로써 사용할 때는 이 꼭 붙어야 함
    // 보안을 위해서라기 보다는 github에 올리지 않기 위해
    // 결국 서비스를 위해 빌드하게 되면 값으로 변환되어 빌드가 되기 때문에
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID
};

export default firebase.initializeApp(firebaseConfig);

