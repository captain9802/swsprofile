<template>
  <div class="introduction dark:bg-[#1e1e1e]">
    <div class="introduction-info dark:text-[#e0e0e0]">
      <div class="introduction-header">
        <div class="image-container">
          <img src="/sws.jpg" alt="프로필 이미지" class="profile-image"/>
        </div>
        <p style="font-weight: 600">손우성</p>
      </div>
      <div class="introduction-content">
        <p>
          <a href="https://github.com/captain9802" target="_blank" class="github-link">
            <i class="fi fi-br-link-alt" style="padding-right: 3px"></i> GitHub: captain9802<br><br>
          </a>
          <i class="fi fi-ss-user" style="padding-right: 3px"></i> 이름: 손우성<br><br>
          <i class="fi fi-br-calendar-check" style="padding-right: 3px"></i> 생년월일: 1998.02.24<br><br>
          <i class="fi fi-ss-home" style="padding-right: 3px"></i> 위치: 경기도 군포시<br><br>
          <i class="fi fi-br-envelope" style="padding-right: 3px"></i> 이메일: captain9802@gmail.com
        </p>
      </div>
    </div>
    <div class="introduction-myself dark:text-[#e0e0e0]">
      <p class="introduction-hi">
        안녕하세요! 기술에 대한 도전과 다양한 기능을 구현하는 것을 즐기는 손우성입니다. <br><br>

        풀스택 개발에 관심을 두고 React, Vue.js, Laravel, SpringBoot, Java17 등을 중심으로 다양한 프로젝트를 진행해왔습니다.<br>
        JavaScript, HTML/CSS3를 활용해 웹 경험을 개선하고, 사용자 친화적인 인터페이스를 만드는 데 노력하고 있습니다.<br><br>

        또한, NaverCloud, AWS, S3 등의 클라우드 환경과 배포에 대한 경험도 있어, 개발과 배포 과정에서 원활한 협업이 가능합니다.<br><br>

        도전적인 마음으로 지속적으로 공부하며, 더 나은 서비스를 만들기 위해 노력하고 있습니다.<br><br>
        함께 이야기 나누고 싶다면 언제든지 연락 주세요! captain9802@gmail.com 😊
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyIntroduction"
}
</script>

<style lang="scss">
.introduction {
  box-sizing: border-box;
  justify-items: center;
  height: 100%;
  align-content: center;
  display: grid;
  gap: 5rem;
  background-color: #F3EBE6;
  border-radius: 10px;
  padding: 1rem;
  transition: all 0.3s ease;

  @media (max-width: 1200px) {
    gap: 3rem;
    padding: 20px;
  }
}

.introduction-header {
  justify-items: center;
  align-content: center;
  display: grid;
  gap: 10px;
}

.introduction-info {
  display: flex;
  gap: 7rem;
  color: #3E3E3E;

  @media (max-width: 1200px) {
    gap: 3rem;
  }

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
}

.introduction-myself {
  font-weight: 600;
  color: #3E3E3E;

  @media (max-width: 1200px) {
    display: none;
  }
}

.image-container {
  width: 140px;
  height: 140px;
  overflow: hidden;
  border-radius: 50%;

  @media (max-width: 1200px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 375px) {
    width: 80px;
    height: 80px;
  }
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.introduction-content {
  font-weight: 600;

  @media (max-width: 375px) {
    font-size: 0.9rem;
  }
}

.github-link {
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
}
</style>
