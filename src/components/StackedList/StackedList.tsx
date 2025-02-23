import "./StackedList.css";
import { StackedListProps } from "./stacked-list.ts";

const StackedList = (props: StackedListProps) => {
  const { items } = props;
  return (
    <div className="list-container">
      <ul className="stacked-list">
        {items.map((item, index) => {
          return (
            <li key={index} className="list-item">
              <div className="item-content">
                {item.avatar && (
                  <div className="item-avatar">{item.avatar}</div>
                )}
                <div className="item-main">
                  <p className="item-text">{item.text}</p>
                  <p className="item-secondary-text">{item.secondaryText}</p>
                </div>
                {item.secondaryAction && (
                  <div className="item-secondary-action">
                    {item.secondaryAction}
                  </div>
                )}
              </div>
              {index !== items.length - 1 && <div className="item-divider" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StackedList;
