<template>
  <div class="flex h-full flex-col gap-4 bg-base-200">
    <NotifyCenter />

    <header class="navbar bg-base-100">
      <div class="flex-1">
        <NuxtLink to="/" class="btn btn-ghost gap-0 text-xl normal-case">
          <Icon name="line-md:chevron-triple-up" />
          {{ $t('common.app.name') }}
        </NuxtLink>
      </div>
      <div class="flex flex-none gap-3">
        <!-- eslint-disable-next-line tailwindcss/classnames-order -->
        <div class="dropdown-end dropdown">
          <label tabindex="0" class="btn btn-circle btn-ghost">
            <div class="indicator">
              <Icon name="line-md:bell" class="h-7 w-7 fill-current" />
              <span class="badge indicator-item badge-sm bg-info">8</span>
            </div>
          </label>
          <div
            tabindex="0"
            class="card dropdown-content card-compact z-[1] mt-3 w-52 bg-base-100 shadow"
          >
            <div class="card-body">
              <div class="card-actions">
                <NuxtLink to="/alarms" class="btn-primary btn btn-sm btn-block">
                  {{ $t('notification.showAll') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <label v-once class="btn btn-circle btn-ghost swap swap-rotate">
          <input type="checkbox" @change="handleThemeSwitch" />
          <Icon
            name="line-md:moon-loop"
            class="h-7 w-7 fill-current"
            :class="[colorMode.value === 'light' ? 'swap-off' : 'swap-on']"
          />
          <Icon
            name="line-md:sunny-outline-loop"
            class="h-7 w-7 fill-current"
            :class="[colorMode.value === 'light' ? 'swap-on' : 'swap-off']"
          />
        </label>

        <div class="dropdown-end dropdown">
          <label tabindex="0" class="avatar btn btn-circle btn-ghost">
            <div class="w-10 rounded-full">
              <img
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                alt="avatar"
              />
            </div>
          </label>
          <ul
            tabindex="0"
            class="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <NuxtLink to="/profile" class="justify-between">
                {{ $t('account.profile') }}
                <span class="badge">{{ $t('badge.new') }}</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/settings">
                {{ $t('account.settings') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/logout">
                {{ $t('account.logout') }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <main class="flex grow gap-4 px-4">
      <nav class="flex flex-col gap-4">
        <ul class="menu rounded-box w-56 grow bg-base-100">
          <li>
            <NuxtLink to="/" class="px-3" data-cy="navigation__dashboard">
              <Icon name="line-md:home-simple" class="h-5 w-5" />
              {{ $t('navigation.dashboard') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/monitored-resources"
              class="px-3"
              data-cy="navigation__monitored-resources"
            >
              <Icon name="line-md:list" class="h-5 w-5" />
              {{ $t('navigation.monitoredResources') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/alarms" class="px-3" data-cy="navigation__alarms">
              <Icon name="line-md:bell" class="h-5 w-5" />
              {{ $t('navigation.alarms') }}
            </NuxtLink>
          </li>
        </ul>

        <ul class="menu rounded-box w-56 bg-base-100">
          <li v-for="monitoredResource in monitoredResources" :key="monitoredResource.url">
            <NuxtLink :to="`/monitored-resources/${monitoredResource.uuid}`" class="px-2">
              <Icon name="line-md:chevron-small-double-right" class="h-5 w-5" />
              {{ monitoredResource.url }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="grow">
        <slot />
      </div>
    </main>

    <footer class="footer items-center bg-base-100 p-4">
      <div class="grid-flow-col items-center">
        <p>
          <Icon name="line-md:chevron-triple-up" />
          <b>{{ $t('common.app.name') }}</b> {{ $t('common.by') }} {{ $t('common.app.author') }} ©
          {{ new Date().getFullYear() }} - {{ $t('common.allRightReserved') }}
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { useMonitoredResourcesStore } from '~/stores/monitoredResources';

const colorMode = useColorMode();
const handleThemeSwitch = () => {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
};

const store = useMonitoredResourcesStore();
const { monitoredResources } = storeToRefs(store);
</script>
