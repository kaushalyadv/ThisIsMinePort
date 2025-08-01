import React, {useState, useEffect, useContext} from "react";
import "./Blog.scss";
import BlogCard from "../../components/blogCard/BlogCard";
import {blogSection} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Blogs() {
  const {isDark} = useContext(StyleContext);
  const [mediumBlogs, setMediumBlogs] = useState([]);

  function setMediumBlogsFunction(array) {
    setMediumBlogs(array);
  }

  //Medium API returns blogs' content in HTML format. Below function extracts blogs' text content within paragraph tags
  function extractTextContent(html) {
    return typeof html === "string"
      ? html
          .split(/<\/p>/i)
          .map(part => part.split(/<p[^>]*>/i).pop())
          .filter(el => el.trim().length > 0)
          .map(el => el.replace(/<\/?[^>]+(>|$)/g, "").trim())
          .join(" ")
      : NaN;
  }

  useEffect(() => {
    if (blogSection.displayMediumBlogs === "true") {
      const getProfileData = () => {
        fetch("/blogs.json")
          .then(result => {
            if (result.ok) {
              return result.json();
            }
          })
          .then(response => {
            setMediumBlogsFunction(response.items);
          })
          .catch(function (error) {
            console.error(
              `${error} (because of this error Blogs section could not be displayed. Blogs section has reverted to default)`
            );
            setMediumBlogsFunction("Error");
            blogSection.displayMediumBlogs = "false";
          });
      };
      getProfileData();
    }
  }, []);

  if (!blogSection.display) {
    return null;
  }

  return (
    <div className="main" id="blogs">
      <div className="blog-header" style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
        <h1 className="blog-header-text">{blogSection.title}</h1>
        <p
          className={
            isDark ? "light-mode blog-subtitle" : "subTitle blog-subtitle"
                }
                style={
                  {padding: '0 2.5em'}
                }
        >
          {blogSection.subtitle}
        </p>
      </div>
      <div className="blog-main-div">
        <div className="blog-text-div">
          {blogSection.displayMediumBlogs !== "true" ||
          mediumBlogs === "Error"
            ? blogSection.blogs.map((blog, i) => {
                return (
                  <BlogCard
                    key={i}
                    isDark={isDark}
                    blog={{
                      url: blog.url,
                      image: blog.image,
                      title: blog.title,
                      description: blog.description
                    }}
                  />
                );
              })
            : mediumBlogs.map((blog, i) => {
                return (
                  <BlogCard
                    key={i}
                    isDark={isDark}
                    blog={{
                      url: blog.link,
                      title: blog.title,
                      description: extractTextContent(blog.content)
                    }}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}