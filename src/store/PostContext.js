import {createContext,useState} from 'react'

export const PostContext = createContext(null)

function Post ({children}){
 const [postdetailes,setpostdetailes] = useState('')

    return(
        <PostContext.Provider value={{postdetailes,setpostdetailes}}>
            {children}
        </PostContext.Provider>
    )
}

export default Post