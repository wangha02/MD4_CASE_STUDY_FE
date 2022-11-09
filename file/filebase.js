import {
    getDownloadURL,
    getMetadata,
    getStorage,
    ref,
    uploadBytesResumable
} from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js'
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

export class Firebase {
    firebaseConfig = {
        apiKey: "AIzaSyC8Y6q7CJXUKOQFHlGXZRo-ILM69u0tJrk",
        authDomain: "wangha-93b45.firebaseapp.com",
        projectId: "wangha-93b45",
        storageBucket: "wangha-93b45.appspot.com",
        messagingSenderId: "551577715350",
        appId: "1:551577715350:web:411f5cdc7f768f3ac378b7",
        measurementId: "G-30LCW1BCT7"
    };
    storage;

    progress;
    url;
    location;

    constructor() {
        const app = initializeApp(this.firebaseConfig);
        this.storage = getStorage(app)
    }

    upload(file) {
        let location = ref(this.storage, this.location);
        const uploadTask = uploadBytesResumable(location, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                let progress = snapshot.bytesTransferred / snapshot.totalBytes * 100
                $(this.progress).val(progress);
            }, (error) => {
                console.log("error ===>")
                console.log(error)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadUrl) => {
                        $(this.url).val(downloadUrl);
                    }
                )
            }
        )
    }

    setProgress(id) {
        this.progress = id;
    }

    setDownloadUrl(url) {
        this.url = url;
    }

    setLocation(location) {
        this.location = location;
    }

}