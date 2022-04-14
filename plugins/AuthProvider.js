import firebase from "firebase/app";
import { createContext, useEffect, useState, VFC, ReactNode } from "react";
import { auth, db } from "../firebase";
export const User = firebase.User;

const AuthContextProps = {
  currentUser: User | null | undefined;
  signInCheck: boolean;
};

const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  signInCheck: false,
});


const AuthProvider: VFC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] =
    useState<User | null | undefined>(undefined);

  const [signInCheck, setSignInCheck] = useState(false);
   
   // ログイン状態を確認する
  
  mounted() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('login');
      } else {
        console.log('logout');
      }
    });     
  }

  if (signInCheck) {
    return (
      <AuthContext.Provider value={{ currentUser, signInCheck }}>
        {children}
      </AuthContext.Provider>
    );
  } else {
  　　　 // ログイン確認中
    // 自分で作ったローディングコンポーネントをレンダリングする
    return <index.vue />;
  }
};

export { AuthContext, AuthProvider };
