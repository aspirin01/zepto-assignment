"use client";
import { useState, useEffect, useRef } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  selected:boolean
}

export default function Home() {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [backHighlighted, setBackHighlighted] = useState<Number>(-1);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const getUsers = async () => {
    try {
      const res = await fetch("/api/users");
      let data = await res.json();
      data = data.data.map((user: any) => ({ ...user, selected: false }));
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);


  const userBackspaceHandler = () => {
    if(backHighlighted===-1){
      let selected = users.filter((user)=>user.selected)
      let selection=selected[selected.length-1]
      setBackHighlighted(selection.id)
    }
    else{
      setUsers((prev)=>{
        const temp = prev.map((u)=>{
          if (u.id === backHighlighted){
            return {...u, selected:false}
          }
          return u
        })
        setFilteredUsers(temp.filter((u)=>!u.selected))
        return temp
      })
      setBackHighlighted(-1)
    }
  }

  const inputOnChangeHander = (e: any) => {
    setInputValue(e.target.value);
    setBackHighlighted(-1)
    if (e.target.value.length > 0) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase()) && !user.selected
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }    
    
  };

  if (isLoading)
    return (
      <div className=" py-3 flex flex-col items-center justify-center text-center">
        Loading data...
      </div>
    );
  if (!users) return <p>No user data</p>;
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="w-full text-2xl py-3">Zepto submission</div>

      <div className="mt-6 w-full  flex items-center justify-center">
        <div className="relative w-2/5  min-w-[200px] ">
          <ul className="w-full">
          <div
            className="relative max-h-96  min-w-[200px] flex flex-row items-center peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all flex-wrap"            
          >
            <div className="pr-2 flex-wrap flex flex-row" >

              {users?.length>0&&users.filter(user=>user.selected).map((user,id)=>{
                return (
                <div
                key={id}
                className={`bg-gray-200 font-medium text-blue-gray-700 px-3 py-1 rounded-full mr-2 flex  flex-row my-1 ${user.id===backHighlighted&&' border-2 border-[#699fc9]'}`}
                >
                  {user.name}
                  <span 
                  className="ml-2 cursor-pointer"
                  onClick={()=>{
                    setUsers((prev)=>{
                      const temp = prev.map((u)=>{
                        if (u.id === user.id){
                          return {...u, selected:false}
                        }
                        return u
                      })
                      setFilteredUsers(temp.filter((u)=>!u.selected))
                      return temp
                    })
                    inputRef?.current?.focus();
                    setOpen(true)
                  }}
                  >
                    {/* svg for cross */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>

                  </span>
                </div>)
              })}
            </div>
            <input
              type="text"
              ref={inputRef}
              value={inputValue}  
              onChange={(e) => inputOnChangeHander(e)}
              onClick={() => setOpen(true)}
              onBlur={() => setOpen(false)}
              onKeyDown={(e) => {
                if (e.key === "Backspace"  && inputValue.length === 0) {
                  
                  userBackspaceHandler();

                  setInputValue("");
                }
              }}
              placeholder="Add new user"
              className=" placeholder-shown:border-blue-gray-200 focus:border-[#699fc9] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 m-1"
            />
            <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-[#699fc9] peer-focus:after:scale-x-100 peer-focus:after:border-[#699fc9] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
          </div>
          {open && (
            <div className="flex-col card absolute w-full max-h-52 mt-2 p-1 flex overflow-y-auto scrollbar-hide ">
                {filteredUsers.length > 0 ? (
                  filteredUsers?.map((user, id) => !user.selected && (
                    <li
                      key={id}
                      className=" p-2 cursor-pointer hover:bg-rose-50 hover:text-rose-700 rounded-md w-full"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setBackHighlighted(-1)
                        setInputValue("");
                        setUsers((prev)=>{
                          const temp = prev.map((u)=>{
                            if (u.id === user.id){
                              return {...u, selected:true}
                            }
                            return u
                          })
                          setFilteredUsers(temp.filter((u)=>!u.selected))
                          return temp
                        })
                      }}
                    >
                      <div className="flex justify-between items-center gap-4">
                        <div className="flex items-center" >
                          <div className="relative inline-flex items-center justify-center w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-700">
                            <span className="font-sm text-gray-700 dark:text-gray-300">
                              {user.name
                                ?.split(" ")
                                ?.map((name) => name[0])
                                ?.join("")
                                ?.toUpperCase()}
                            </span>
                          </div>
                          <div className=" px-4">{user.name}</div>
                        </div>

                        <div className="text-gray-400">{user.email}</div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">No options available</li>
                )}
            </div>
          )}
          </ul>
        </div>
      </div>
      <div className="w-full absolute bottom-2">Made with 
      <span className="px-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="red" >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </span>
         by <a target="/blank" href="https://www.linkedin.com/in/harshitbhallaiitd/">Harshit Bhalla</a> </div>
    </div>
  );
}
