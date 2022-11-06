// import { useEffect, useState } from "react";
// import jwt_decode from "jwt-decode";

// function App() {
//   const [user, setUser] = useState({});

//   const handelCallBack = (response) => {
//     const userObject = jwt_decode(response.credential);
//     console.log(userObject);
//     setUser(userObject);
//     document.getElementById("signInDiv").hidden = true;
//   }

//   const handelSignOut = (e) => {
//     setUser({});
//     document.getElementById("signInDiv").hidden = false;
//   }
//   useEffect(() => {
//     google.accounts.id.initialize({
//       client_id: "365697724372-iosgnj9lvabjoo2a56fim73bnu5t7odh.apps.googleusercontent.com",
//       callback: handelCallBack
//     });

//     google.accounts.id.renderButton(
//       document.getElementById("signInDiv"),
//       { theme: "outline", size: "large" }
//     );

//     google.accounts.id.prompt();
//   }, []);
//   return (
//     <div className="App">

//       <div id="signInDiv">

//       </div>
//       {
//         Object.keys(user).length !== 0 &&
//         <button onClick={(e) => handelSignOut(e)}>Sign Out</button>
//       }

//       {user &&
//         <div>
//           <img src={user.picture} />
//           <h3>{user.name}</h3>
//         </div>
//       }
//     </div>
//   );
// }

// export default App;
