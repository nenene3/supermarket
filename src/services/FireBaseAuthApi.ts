import { auth } from "@/config/firebase_config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc,addDoc ,doc} from "firebase/firestore";
import { db } from "@/config/firebase_config";

export type Role = 'admin' | 'user'

export async function LogInFireBase(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("user log in Successfully");
  } catch (e) {
    throw e;
  }
}

export async function LogOutFireBase() {
  try {
    await signOut(auth);
    console.log("log out Successfully");
  } catch (e) {
    throw e;
  }
}


export async function createUserFireBase(email:string,password:string){
  try{
    const {user} = await createUserWithEmailAndPassword(auth, email, password)
    console.log(user)
    console.log('user created')
    attachRoleToUser(user.email!,user.uid,'user')
  }catch(e){
    throw e
  }

}

export async function attachRoleToUser(email:string,uid:string,role:Role = 'user'){
  try{
     await setDoc(doc(db,'users',uid),{
      email,
      role
    })
    
  }catch(e){
    throw e 
  }
}