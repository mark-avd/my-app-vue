<template>
  <div class="text-bubble">
    <slot />
  </div>
</template>

<style lang="scss">
.text-bubble {
  background: #ffffff;
  border: #030303 solid 1px;
  border-radius: 13px 13px 13px 8px;
  padding: 2px 4px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    border-color: transparent #ffffff;
    border-style: solid;
    border-width: 15px 15px 0 0;
    left: -15px;
    top: 80%;
    margin-top: -10px;
    z-index: 1;
  }

  &:before {
    content: '';
    position: absolute;
    border-color: transparent #030303;
    border-style: solid;
    border-width: 16px 16px 0 0;
    left: -17px;
    top: 80%;
    margin-top: -10px;
    z-index: 0;
  }
}
</style>
