import { useState } from "react";
import { AvatarProps } from "@/types/avatar";
import "./avatar.css";

const Avatar = (props: AvatarProps) => {
  const {
    src,
    alt,
    initials,
    size = "md",
    status = "online",
    className = "",
  } = props;

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const avatarClasses = ["avatar", `avatar--${size}`, className]
    .filter(Boolean)
    .join(" ");

  const statusClasses = [
    "avatar-status",
    `avatar-status--${status}`,
    `avatar-status--${size}`,
  ]
    .filter(Boolean)
    .join(" ");

  const renderContent = () => {
    if (src && !imageError) {
      return <img src={src} alt={alt} onError={handleImageError} />;
    } else {
      return (
        <span className="avatar--text">
          {initials?.toUpperCase() || alt?.charAt(0)?.toUpperCase() || "?"}
        </span>
      );
    }
  };

  return (
    <div className="avatar-wrapper">
      <div className={avatarClasses} {...props}>
        {renderContent()}
      </div>
      {status && <span className={statusClasses} />}
    </div>
  );
};

export default Avatar;
