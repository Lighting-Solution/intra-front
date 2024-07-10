import React from "react";
import { BiCoffee, BiFoodMenu, BiDish } from "react-icons/bi";
const Menu = () => {
  const weeklyMenu = [
    {
      day: "월요일",
      meal: "아침: 팬케이크, 점심: 치킨 샐러드, 저녁: 파스타",
      icon: <BiCoffee size={60} />,
    },
    {
      day: "화요일",
      meal: "아침: 계란후라이와 토스트, 점심: 샌드위치, 저녁: 볶음요리",
      icon: <BiFoodMenu size={60} />,
    },
    {
      day: "수요일",
      meal: "아침: 오트밀, 점심: 피자, 저녁: 피쉬 타코",
      icon: <BiDish size={60} />,
    },
    {
      day: "목요일",
      meal: "아침: 스무디, 점심: 스시, 저녁: 스테이크와 감자",
      icon: <BiCoffee size={60} />,
    },
    {
      day: "금요일",
      meal: "아침: 와플, 점심: 부리또, 저녁: 바베큐 리브",
      icon: <BiFoodMenu size={60} />,
    },
  ];
  return (
    <div className="mt-4">
      <h4 className="mb-3">주간 식단표</h4>
      <div className="row">
        {weeklyMenu.map((item, index) => (
          <div
            key={index}
            className="col-lg-2 mb-3 d-flex justify-content-center"
            style={{ width: "15%" }} // Set width to 15%
          >
            <div className="card text-center" style={{ height: "100%" }}>
              <div
                className="card-body d-flex flex-column justify-content-between"
                style={{ height: "100%" }}
              >
                <div className="mb-3">{item.icon}</div>
                <h5 className="card-title">{item.day}</h5>
                <p className="card-text">{item.meal}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Menu;
