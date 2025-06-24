<template>
  <div v-if="isOpen" class="dialog-overlay" @click.self="closeDialog">
    <div class="dialog dark:bg-[#1e1e1e] dark:text-white">
      <div class="title">로그인</div>
      <input
          type="email"
          v-model="email"
          placeholder="이메일"
          class="email-input dark:bg-[#2a2a2a] dark:border-[#555] dark:text-white dark:placeholder-gray-400"
      />
      <input
          type="password"
          v-model="password"
          placeholder="비밀번호"
          class="password-input dark:bg-[#2a2a2a] dark:border-[#555] dark:text-white dark:placeholder-gray-400"
      />
      <div class="btn">
        <button @click="handleLogin" class="login-btn">로그인</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(["close", "login"]);

const email = ref("");
const password = ref("");

const handleLogin = () => {
  emit("login", { email: email.value, password: password.value });
};

const closeDialog = () => {
  emit("close");
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 350px;
  transition: background-color 0.3s ease;
}

.btn {
  display: flex;
  justify-content: center;
  gap: 3rem;
}

.email-input,
.password-input {
  border: 1px solid;
  border-radius: 4px;
  padding: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.email-input::placeholder,
.password-input::placeholder {
  font-size: 16px;
}

.login-btn {
  background-color: #d17a22;
  color: white;
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.login-btn:hover {
  background-color: #b56119;
}

@media (max-width: 715px) {
  .login-btn {
    font-size: 14px;
    margin: 0;
    padding: 4px 8px;
  }

  .email-input::placeholder,
  .password-input::placeholder {
    font-size: 12px;
  }

  .email-input,
  .password-input {
    border-radius: 4px;
    padding: 2px;
  }

  .title {
    font-size: 1.25rem;
  }
}
</style>
