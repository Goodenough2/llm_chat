<template>
  <div class="home-page">
    <header class="header">
      <div class="header-left">
        <span class="logo-text">ChatBot</span>
      </div>
      <div class="header-right">
        <div class="search-container" @click="handleSearchClick">
          <div class="search-input">
            <el-icon class="search-icon">
              <Search />
            </el-icon>
            <input type="text" placeholder="搜索" readonly v-model="searchText" />
            <div class="shortcut-key">⌘ K</div>
          </div>
        </div>
        <a href="https://github.com/Goodenough2/llm_chat" target="_blank" class="github-link">
          <img src="@/assets/photo/github.png" alt="GitHub" class="github-icon" />
        </a>
      </div>
    </header>

    <!-- 添加主体内容 -->
    <main class="main-content">
      <div class="hero-section">
        <h3 class="title">有什么可以帮忙的？</h3>
        <p class="description">
          我是一个智能助手，你可以和我聊天，探索知识，或者获取帮助。
        </p>
        <!-- <router-link to="/chat" class="start-button">
          <span class="mirror-text">开始对话</span>
          <div class="liquid"></div>
        </router-link> -->
      </div>
    </main>

    <!-- 搜索对话框 -->
    <Transition name="fade">
      <div v-if="showSearchDialog" class="search-dialog-overlay" @click="handleOverlayClick">
        <div class="search-dialog-container" @click.stop>
          <SearchDialog />
        </div>
      </div>
    </Transition>
    
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Search} from '@element-plus/icons-vue'
import SearchDialog from '@/components/SearchDialog.vue'

const searchText = ref('')
const showSearchDialog = ref(false)

// 处理搜索框点击
const handleSearchClick = () => {
  showSearchDialog.value = true
}

const handleOverlayClick = () => {
  showSearchDialog.value = false
}

// const handleClickOutside = (event) => {
//   // const searchDialog = document.querySelector('.search-dialog')
//   // console.log(searchDialog)
//   // if (
//   //   searchDialog &&
//   //   !searchDialog.contains(event.target) &&
//   //   !event.target.closest('.search-container')
//   // ) {
//   //   showSearchDialog.value = false
//   // }
// }

// 处理快捷键
const handleKeydown = (event) => {
  // ESC 关闭对话框
  if (event.key === 'Escape') {
    showSearchDialog.value = false
  }
  // Cmd/Ctrl + K 打开对话框
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault()
    showSearchDialog.value = true
  }
}

onMounted(() => {
  // document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  // document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>


<style lang="scss" scoped>
.home-page {
  min-height: 100vh; // 确保页面至少占满整个视口高度
  background-color: var(--el-bg-color); // 使用 Element Plus 的主题背景色
}

.header {
  height: 64px; // 固定头部高度
  padding: 0 32px; // 左右内边距
  display: flex; // 使用弹性布局
  align-items: center; // 垂直居中
  justify-content: space-between; // 两端对齐
  border-bottom: 1px solid var(--el-border-color); // 底部边框
  background-color: var(--el-bg-color); // 头部背景色

  .header-left {

    .logo-text {
      font-size: 20px;
      font-weight: 600;
      color: #171717;
      white-space: nowrap; // 防止文字换行
    }
  }

  .header-right {
    display: flex; // 使用弹性布局
    align-items: center; // 垂直居中对齐
    gap: 16px; // 子元素之间的间距
    flex: 1; // 占据剩余空间
    justify-content: flex-end; // 右对齐

    .search-container {
      flex: 1; // 搜索框容器占据剩余空间
      max-width: 280px; // 最大宽度限制
      min-width: 40px; // 减小最小宽度
      margin-left: 16px; // 与logo保持距离

      .search-input {
        display: flex; // 搜索框内部使用弹性布局
        align-items: center; // 搜索框内部元素垂直居中

        width: 100%; // 搜索框宽度填充容器
        height: 32px; // 搜索框固定高度
        padding: 0 12px; // 左右内边距
        border-radius: 6px; // 圆角边框
        background-color: #f2f2f2; // Vercel 风格的浅灰色背景

        .search-icon {
          flex-shrink: 0; // 防止图标被压缩
          font-size: 14px; // 搜索图标大小
          color: #8f8f8f; // Vercel 风格的图标颜色
          margin-right: 8px; // 图标右侧间距
        }

        input {
          flex: 1; // 输入框占据剩余空间
          width: 0; // 添加这行，强制输入框从0开始计算宽度
          min-width: 0; // 防止输入框溢出
          border: none; // 移除输入框边框
          outline: none; // 移除输入框轮廓
          background: none; // 移除输入框背景
          font-size: 13px; // 输入框字体大小
          color: #000; // Vercel 风格的文本颜色

          &::placeholder {
            color: #666666; // Vercel 风格的占位符颜色
          }
        }

        .shortcut-key {
          flex-shrink: 0; // 防止快捷键被压缩
          font-size: 12px; // 快捷键文本大小
          color: #171717; // Vercel 风格的快捷键文本颜色
          background-color: #fafafa; // 快捷键白色背景
          padding: 2px 4px; // 快捷键内边距
          border-radius: 4px; // 快捷键圆角
          border: 1.5px solid #dfdfdf; // Vercel 风格的边框
        }
      }
    }

    .github-link {
      display: flex; // 使用弹性布局
      align-items: center; // 垂直居中对齐
      height: 32px; // 与搜索框保持相同高度
      flex-shrink: 0; // 防止github图标被压缩
    }

    .github-icon {
      width: 22px; // 图标宽度
      height: 22px; // 图标高度
      cursor: pointer; // 鼠标指针样式
      opacity: 1; // 不透明度
    }
  }
}

.main-content {
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;

  .hero-section {
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    .title {
      font-size: 36px;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 24px;
    }

    .description {
      font-size: 20px;
      color: #666;
      max-width: 600px;
      margin: 0 auto 64px;
      line-height: 1.5;
    }
  }
}

.search-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  z-index: 1000;
}

.search-dialog-container {
  background-color: rgba(202, 33, 33, 0.4);
  margin-top: 15vh;
  width: 640px;
  height: fit-content;
}

</style>
