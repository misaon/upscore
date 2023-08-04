<template>
  <div class="h-full flex flex-col gap-4 bg-base-200">
    <header class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl gap-0">
          <Icon name="line-md:chevron-triple-up" />
          {{ $t('common.app.name') }}
        </a>
      </div>
      <div class="flex-none flex gap-3">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <Icon name="line-md:bell" class="fill-current w-7 h-7" />
              <span class="badge badge-sm indicator-item bg-info">8</span>
            </div>
          </label>
          <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div class="card-body">
              <div class="card-actions">
                <button class="btn btn-primary text-white btn-block btn-sm">
                  Zobrazit všechny
                </button>
              </div>
            </div>
          </div>
        </div>

        <label v-once class="swap swap-rotate btn btn-ghost btn-circle">
          <input type="checkbox" @change="handleThemeSwitch">
          <Icon name="line-md:moon-loop" class="fill-current w-7 h-7" :class="[colorMode.value === 'light' ? 'swap-off' : 'swap-on']" />
          <Icon name="line-md:sunny-outline-loop" class="fill-current w-7 h-7" :class="[colorMode.value === 'light' ? 'swap-on' : 'swap-off']" />
        </label>

        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50">
            </div>
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 shadow rounded-box w-52">
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </header>

    <main class="flex gap-4 flex-grow px-4">
      <nav class="flex flex-col gap-4">
        <ul class="flex-grow menu bg-base-100 w-56 rounded-box">
          <li>
            <a class="px-3">
              <Icon name="line-md:home-simple" class="h-5 w-5" />
              Přehled
            </a>
          </li>
          <li>
            <a class="px-3">
              <Icon name="line-md:list" class="h-5 w-5" />
              Hlídané položky
            </a>
          </li>
          <li>
            <a class="px-3">
              <Icon name="line-md:bell" class="h-5 w-5" />
              Alarmy
            </a>
          </li>
        </ul>

        <ul class="menu bg-base-100 w-56 rounded-box">
          <li>
            <a class="px-2">
              <Icon name="line-md:chevron-small-double-right" class="h-5 w-5" />
              Položka 1
            </a>
          </li>
          <li>
            <a class="px-2">
              <Icon name="line-md:chevron-small-double-right" class="h-5 w-5" />
              Položka 2
            </a>
          </li>
          <li>
            <a class="px-2">
              <Icon name="line-md:chevron-small-double-right" class="h-5 w-5" />
              Položka 3
            </a>
          </li>
          <li>
            <a class="px-2">
              <Icon name="line-md:chevron-small-double-right" class="h-5 w-5" />
              Položka 4
            </a>
          </li>
          <li>
            <a class="px-2">
              <Icon name="line-md:chevron-small-double-right" class="h-5 w-5" />
              Položka 5
            </a>
          </li>
        </ul>
      </nav>

      <div class="flex-grow">
        <slot />
      </div>
    </main>

    <footer class="footer items-center p-4 bg-base-100">
      <div class="items-center grid-flow-col">
        <p>
          <Icon name="line-md:chevron-triple-up" />
          <b>{{ $t('common.app.name') }}</b> by {{ $t('common.app.author') }} © 2023 - All right reserved
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()

const handleThemeSwitch = () => {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light'
}
</script>
