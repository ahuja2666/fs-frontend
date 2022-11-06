import { useEffect, useState } from "react";
import "./logout.css"
import jwt_decode from "jwt-decode";
import axios from 'axios'

const Logout = () => {
  const [user, setUser] = useState({});
  const [file, setFile] = useState();
  const [files, setFiles] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userObject = jwt_decode(token);
    setUser(userObject);
    fetch("https://fs-backend-06.herokuapp.com/list")
      .then(resp => resp.json())
      .then(data => setFiles(data))
  }, []);


  const reload = () => {
    window.location = "/";
  }
  const handelLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedin");
    reload();
  };
  const downloadFile = (e) => {
    fetch(`https://fs-backend-06.herokuapp.com/download/${e.target.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `${e.target.id}`,
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  }

  const submit = async event => {
    event.preventDefault()

    const formData = new FormData();
    formData.append("file", file)
    await axios.post("https://fs-backend-06.herokuapp.com/upload", formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(
      resp => resp
    ).then(
      () => window.location.reload()
    )
  }



  return (
    <>
      <div className="container-box">
        <div className="userbox">
          <h2>Hi, {user.name} <br /> Welcome to file System <br /> Upload Files Now!</h2>


          <img alt="userimage" src={user.picture} className="userimg" />
        </div>
        <button className="logoutbtn" onClick={() => handelLogout()}>Log Out</button>
        <form onSubmit={submit} >
          <input onChange={e => setFile(e.target.files[0])} name="file" id="file" type="file" placeholder="No file chosen" required />
          <button type="submit" className="uploadbtn">Upload</button>
        </form>
        <div className="file-section">
          {
            files.map((each, i) => {
              return (
                <div key={i} className="eachfilese">
                  <h3 className="hfilehead" key={i}>{each}</h3>
                  <img className="imgofic" src="http://cdn.onlinewebfonts.com/svg/img_664.png" alt="fileicon" height="150" width="150" />
                  <button onClick={(e) => downloadFile(e)} id={each} className="dwnbtn">Download</button>
                </div>

              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Logout;