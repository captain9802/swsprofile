<template>
  <div class="introduction">
    <div class="introduction-info">
      <div class="introduction-header">
        <div class="image-container">
          <img src="/sws.jpg" alt="프로필 이미지" class="profile-image"/>
        </div>
        <p>손우성</p>
      </div>
      <div class="introduction-content">
        <p>
          🔗 GitHub: captain9802<br><br>
          👤 이름: 손우성<br><br>
          📅 생년월일: 1998.02.24<br><br>
          📍 위치: 경기도 군포시<br><br>
          📞 연락처: 010-9493-9521<br><br>
          📧 이메일: captain9802@gmail.com
        </p>
      </div>
    </div>
    <div class="introduction-myself">
      <p class="introduction-hi">
        안녕하세요! 👋
        도전과 해결을 즐기는 개발자 손우성입니다.<br><br>
        React와 Vue를 활용하여 더 나은 웹 경험을 만드는 것을 목표로 하고 있으며, 디자인 툴인 Figma를 통해 사용자 친화적인 UI를 구현하는 데 집중하고 있습니다.<br><br>

        새로운 기술을 배우는 것을 즐기며, 문제를 해결하는 과정에서 성장하는 것이 개발의 가장 큰 매력이라고 생각합니다.
        더 좋은 서비스를 만들기 위해 끊임없이 고민하고 도전합니다.<br><br>
        궁금한 점이 있거나, 함께 이야기 나누고 싶다면 언제든 연락 주세요!
        📧 captain9802@gmail.com
        감사합니다! 😊
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
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 1rem;

  @media (max-width: 1200px) {
    gap: 3rem;
    padding: 0.5rem;
  }
}

.introduction-header {
  justify-items: center;
  align-content: center;
}

.introduction-info {
  display: flex;
  gap: 7rem;

  @media (max-width: 1200px) {
    gap: 3rem;
  }

  @media (max-width: 375px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
}

.introduction-myself {
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
  @media (max-width: 375px) {
    font-size: 0.9rem;
  }
}

</style>
