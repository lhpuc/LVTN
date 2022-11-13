import React, { useState } from "react";
import Star from "../Star/Star";
import "./Rating.css";

const Rating = () => {
  const [gradeIndex, setGradeIndex] = useState();
  const GRADES = ["Tệ", "Trung Bình", "Tốt", "Rất tốt", "Thật tuyệt vời"];
  const activeStar = {
    fill: "yellow",
  };

  const changeGradeIndex = (index) => {
    setGradeIndex(index);
  };

  return (
    <div className="container">
      <h1 className="result">
        {GRADES[gradeIndex] ? GRADES[gradeIndex] : "Bạn chưa đánh giá"}
      </h1>
      <div className="stars">
        {GRADES.map((grade, index) => (
          <Star
            index={index}
            key={grade}
            changeGradeIndex={changeGradeIndex}
            style={gradeIndex >= index ? activeStar : {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Rating;
