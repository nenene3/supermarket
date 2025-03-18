import { useEffect } from "react";

function useKeys(key:string,action:()=>void) {
  useEffect(() => {
    function cb(e:KeyboardEvent) {
      if (e.key.toLowerCase() === key.toLowerCase())
        action() 
    }

    document.addEventListener("keydown", cb);
    console.log('render')
    return () => {
      document.removeEventListener("keydown", cb);
    };
  }, [key, action]);
}

export default useKeys ;
