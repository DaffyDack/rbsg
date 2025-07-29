<script>
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
</script>


<template>
      <div class="upTab">
      <Tabs value="0" scrollable>
            <TabList>   
              <div class="companyLabel">MULTIVERSE CONNECT</div>
              <Tab v-for="(tab, i) in userTabs" :key="i" :value="String(i)" class="tag_error">
                <span class="tag" :class="{ error: tab.errors }"></span>
                {{ tab.title }}
              </Tab>
            </TabList>
        </Tabs>
    </div>
</template>


<style lang="scss">
.upTab {
  .p-tab {
        border-width: inherit;
  }
  .p-tablist-tab-list {
        position: relative;
      display: flex;
      background: none;
      border-width:inherit;
  padding: 20px 0;
      justify-content: center;
      align-items: center;
    }
    .p-tab-active {
    background: var(--p-tabs-tab-active-background);
    border-color: wheat;
    color: white;
    }

     .companyLabel {
      position: absolute;
      left:0;
      display: flex;
      align-items:center;
      text-align: center;
      font-size: 22px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      background: linear-gradient(90deg, #FF33E4 0%, #178FFF 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

    }

}

</style>
