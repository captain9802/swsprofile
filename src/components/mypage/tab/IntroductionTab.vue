<template>
  <div class="tab-content-myprofile">
    <div class="text-with-line">
      <div class="text-with-line-text">
        INTRODUCE
      </div>
    </div>
    <h6>안녕하세요! 저는 손우성입니다.
      저는 현재 FrontEnd 직군에서 다양한 프로젝트를 진행하고 있습니다.
      React와 JavaScript를 특히 좋아하며, 프론트엔드와 백엔드 모두에서 프로젝트 경험이 있습니다.

      현재는 **'종합놀이터(퀴즈)'**라는 퀴즈 사이트 프로젝트를 진행 중입니다.
      기술 스택으로는 Java, Spring Boot, React, Node.js, MySQL, AWS, Docker 등 다양한 기술을 사용하고 있으며,
      새로운 기술 트렌드와 실제 프로덕션 환경 사이에서 효율을 찾아가며 매일 발전하고 있습니다.

      잘 부탁드립니다!</h6>
  </div>
</template>

<script>
export default {
  name: "IntroductionTab"
};
</script>

<style lang="scss" scoped>
.tab-content-myprofile {
  height: 100%;
  width: 100%;
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 0 1rem;
}

.text-with-line {
  position: relative;
  display: inline-block;
  width: 100%;
  padding: 0;
}

.text-with-line-text {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.text-with-line::before,
.text-with-line::after {
  content: '';
  position: absolute;
  top: 50%;
  height: 2px;
  background-color: #ccc;
}

.text-with-line::before {
  left: 0;
  width: 3%;
}

.text-with-line::after {
  right: 0;
  width: 83%;
}
</style>
