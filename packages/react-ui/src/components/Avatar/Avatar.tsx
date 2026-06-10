import { useState } from "react";
import { AvatarProps } from "./avatar";
import "./Avatar.css";

const Avatar = (props: AvatarProps) => {
  const {
    src,
    alt,
    initials,
    size = "md",
    status,
    className = "",
    ...rest
  } = props;

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const avatarClasses = ["avatar", `avatar--${size}`, className]
    .filter(Boolean)
    .join(" ");

  const statusClasses = [
    "avatar--status",
    `avatar--status-${status}`,
    `avatar--status-${size}`,
  ]
    .filter(Boolean)
    .join(" ");

  const renderContent = () => {
    if (src && !imageError) {
      return <img src={src} alt={alt} onError={handleImageError} />;
    } else {
      return (
        <span>
          {initials?.toUpperCase() || alt?.charAt(0)?.toUpperCase() || "?"}
        </span>
      );
    }
  };

  return (
    <div className="avatar-wrapper">
      <div className={avatarClasses} {...rest}>
        {renderContent()}
      </div>
      {status && <span className={statusClasses} />}
    </div>
  );
};

export default Avatar;
