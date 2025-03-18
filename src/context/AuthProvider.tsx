import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { auth } from "@/config/firebase_config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase_config"; // Import Firestore instance

export type Role = 'admin' | 'user' 

type AuthContextType = {
  user: User | null;
  role: Role | null
  loading: boolean;
};

// Create context with default value of null
export const AppContext = createContext<AuthContextType | null>(null);

// Custom hook to access auth context
export function useAuthContext() {
  const authContext = useContext(AppContext);
  if (!authContext) {
    throw new Error("Auth context used outside its provider");
  }
  return authContext;
}

// AuthProvider Component
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role |null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Fetch role from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role); // Get role from Firestore
        } else {
          setRole("user"); // Default role if not found
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{ user, role, loading }}>
      {children}
    </AppContext.Provider>
  );
}
