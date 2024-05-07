import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { MDBInput } from "mdb-react-ui-kit";
import React, { useEffect, useRef, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import Footer from "./Footer";

export default function AddNewBlog() {
  const [urlImage, setUrlImage] = useState("");
  const inputFileReference = useRef(null);
  const [contentBlog, setContentBlog] = useState({
    title:'',
    path:'',
    content:'',
    thumbnail:''
  })

  const fileUploadAction = () => {
    inputFileReference.current.click();
  };
  const uploadImage = async () => {
    const selectedFile = inputFileReference.current.files[0];
    const url = URL.createObjectURL(selectedFile);
    setContentBlog({...contentBlog, thumbnail:selectedFile.name})
    await setUrlImage(url);
  };
  const editorConfiguration = {
    toolbar: {
      items: ["heading", "|", "bold", "imageUpload", "htmlEmbed"],
    },
    language: "en",
  };
  const makeUrl=(str)=>{
    str = str.replace(/ +(?= )/g, '');
    str = str.replace(/[.,;:'"!@#$%^&*()+_=?|\/`~<>]/g, '');
    str = str.replace(/ /g, '-');
    str = str.replace(/--/g, '-');
    return str.toLowerCase();
  }
  return (
    <>
      <div style={{ marginTop: "150px", height: "100%", width: "80%" }}>
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            textShadow: "0px 5px 4px rgb(0,0,0,0.4)",
          }}
        >
          Add New Blog
        </h1>
        <div
          style={{
            margin: "50px 0px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ width: "45%" }}>
            <MDBInput
              label="Title"
              id="TitleBlog"
              type="text"
              value={contentBlog.title}
              onChange={(e)=>{
                setContentBlog({...contentBlog, title:e.target.value, path:makeUrl(e.target.value)});
              }}
              style={{ background: "white", height: "40px", marginBottom:'5%' }}
            />
            <MDBInput
              label="Path"
              id="PathBlog"
              type="text"
              value={contentBlog.path}
              onChange={(e)=>{
                setContentBlog({...contentBlog, path:e.target.value})
              }}
              style={{ background: "white", height: "40px" }}
            />
          </div>
          <div style={{ width: "45%" }}>
            <p>Thumbnail</p>
            <div
              style={{
                width: "90%",
                height: "250px",
                border: "1px solid white",
                borderRadius: "10px",
                position: "relative",
              }}
            >
              {urlImage !== "" ? (
                <Image
                  src={urlImage}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                />
              ) : null}
              <Button
                onClick={() => fileUploadAction()}
                onChange={() => uploadImage()}
                style={{ position: "absolute", width: "10%" , background:'#67D3DF', border:'none'}}
              >
                <FaCamera></FaCamera>
                <input
                  hidden
                  ref={inputFileReference}
                  type="file"
                  style={{ position: "absolute", left: "0px" }}
                />
              </Button>
            </div>
          </div>
        </div>
        <CKEditor
          editor={ClassicEditor}
          data={contentBlog.content}
          onReady={(editor) => {
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "width",
                "100%",
                editor.editing.view.document.getRoot()
              );
              writer.setStyle(
                "height",
                "500px",
                editor.editing.view.document.getRoot()
              );
              writer.setStyle(
                "color",
                "black",
                editor.editing.view.document.getRoot()
              );
            });
          }}
          onChange={(event, editor) => {
            const data = editor.getData()
            setContentBlog({...contentBlog, content: data})
          }}
          onBlur={(event, editor) => {
            //   console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            //   console.log("Focus.", editor);
          }}
          config={{
            editorConfiguration,
          }}
        />
        <Button style={{margin:'2% 0 10% 0',textTransform:'capitalize', background:'#67D3DF', border:'none'}}>Add New Blog</Button>
      </div>
      <Footer />
    </>
  );
}
