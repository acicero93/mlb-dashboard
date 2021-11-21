<template>
  <div class="max-w-lg mx-auto">
    <div>
      <div class="text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <h2 class="mt-2 text-lg font-medium text-gray-900">Teams</h2>
        <p class="mt-1 text-sm text-gray-500">
          Search for a team to view stats
        </p>
      </div>
      <form action="#" class="mt-6 flex">
        <label for="team" class="sr-only">Team Name</label>
        <input
          type="text"
          name="team"
          id="team"
          class="
            shadow-sm
            focus:ring-indigo-500 focus:border-indigo-500
            block
            w-full
            sm:text-sm
            border-gray-300
            rounded-md
          "
          placeholder="Cleveland Guardians"
        />
        <button
          type="submit"
          class="
            ml-4
            flex-shrink-0
            px-4
            py-2
            border border-transparent
            text-sm
            font-medium
            rounded-md
            shadow-sm
            text-white
            bg-indigo-600
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
          "
        >
          Search
        </button>
      </form>
    </div>
    <div class="mt-10">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Previously searched teams.
      </h3>
      <ul
        role="list"
        class="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200"
      >
        <li
          v-for="(person, personIdx) in people"
          :key="personIdx"
          class="py-4 flex items-center justify-between space-x-3"
        >
          <div class="min-w-0 flex-1 flex items-center space-x-3">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                :src="person.imageUrl"
                alt=""
              />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ person.name }}
              </p>
              <p class="text-sm font-medium text-gray-500 truncate">
                {{ person.role }}
              </p>
            </div>
          </div>
          <div class="flex-shrink-0">
            <button
              type="button"
              class="
                inline-flex
                items-center
                py-2
                px-3
                border border-transparent
                rounded-full
                bg-gray-100
                hover:bg-gray-200
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-indigo-500
              "
            >
              <HeartIcon
                class="-ml-1 mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span class="text-sm font-medium text-gray-900">
                Favorite <span class="sr-only">{{ person.name }}</span>
              </span>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { HeartIcon } from "@heroicons/vue/solid";
// const MLBStatsAPI = require("mlb-stats-api");
// const mlbStats = new MLBStatsAPI();

const people = [
  {
    name: "Lindsay Walton",
    handle: "lindsaywalton",
    email: "lindsaywalton@example.com",
    role: "Front-end Developer",
    imageId: "1517841905240-472988babdf9",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Courtney Henry",
    handle: "courtneyhenry",
    email: "courtneyhenry@example.com",
    role: "Designer",
    imageId: "1438761681033-6461ffad8d80",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Tom Cook",
    handle: "tomcook",
    email: "tomcook@example.com",
    role: "Director, Product Development",
    imageId: "1472099645785-5658abf4ff4e",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default {
  components: {
    HeartIcon,
  },
  setup() {
    // mlbStats.getAttendance({
    //   params: { teamId: 111, leagueId: 103, leagueListid: 103 },
    // });

    return {
      people,
    };
  },
};
</script>
