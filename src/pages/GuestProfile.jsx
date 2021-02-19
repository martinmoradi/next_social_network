import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getUserPosts } from "../actions/postActions";
import { useHistory } from "react-router-dom";
import moment from "moment";

const GuestProfile = ({ posts, getUserPosts, auth, sayHello }) => {
  const history = useHistory();
  const { userSlug } = useParams();
  if (parseInt(userSlug) === auth.user.id) {
    history.push("/profile");
  }

  useEffect(() => {
    getUserPosts(userSlug);
  }, [userSlug]);

  const renderList = () => {
    return posts.posts.map((post) => {
      return (
        <div
          className="bg-white relative border shadow-sm px-4 py-3 rounded-lg max-w-lg mx-auto mt-4"
          key={post.id}
        >
          <div className="flex items-center">
            <div className="ml-2">
              <div className="text-sm ">
                <span className="font-semibold text-lg">
                  {post.user.username[0].toUpperCase() +
                    post.user.username.substring(1)}
                </span>
              </div>
              <div className="text-gray-500 text-xs flex">
                <span className="inline-block">
                  {moment(post.created_at).startOf().fromNow()}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-800 text-sm mt-2 leading-normal md:leading-relaxed">
            {post.text}
          </p>

          <div className="text-gray-500 text-xs flex items-center mt-3">
            <img
              className="mr-0.5"
              src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97"
            />
            <span className="ml-1">
              {post.like === null ? "0" : post.like}{" "}
              {post.like > 1 ? "likes" : "like"}
            </span>
            <div className="justify-self-end"></div>
          </div>
        </div>
      );
    });
  };

  return <div>{renderList()}</div>;
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getUserPosts,
})(GuestProfile);
