<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Lato:400,600,700");

body,
html {
    font-family: "Lato", sans-serif;
    background: #f9fafb;
    margin: 0;
}
html {
    box-sizing: border-box;
}
*,
*:before,
*:after {
    box-sizing: inherit;
}
</style>

<style lang="scss" scoped>
$grid-size: 1100px;
.content {
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    flex-flow: column;
}
.dummy {
    height: 30px;
    margin-top: auto;
    margin-bottom: auto;
    background: #e6e6e6;
    border-radius: 4px;
    color: #b1b1b1;
    line-height: 10px;
    font-size: 14px;
    padding: 10px;
}
.navbar {
    height: 50px;
    background: #fff;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    flex-wrap: wrap;
    padding: 0 30px;
    .dummy-logo {
        margin-right: auto;
        width: 100px;
        text-align: center;
    }
    .dummy-search {
        margin-left: auto;
        margin-right: auto;
        width: 300px;
    }
    .dummy-profile {
        margin-left: auto;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        padding: 0px;
    }
    .dummy-profile-text {
        margin-left: 10px;
        height: 14px;
        width: 100px;
        padding: 0px;
    }
}
.crumbs {
    margin-top: 30px;
    display: flex;
    max-width: $grid-size;
    margin-left: auto;
    margin-right: auto;
    padding: 0 30px;
    width: 100%;
    .dummy-crumb {
        width: 30px;
    }
    .dummy-crumb-text {
        margin-left: 10px;
        height: 14px;
        width: 100px;
        padding: 0px;
    }
    .dummy-btn {
        margin-left: auto;
        width: 100px;
        text-align: center;
    }
}
.page {
    display: flex;
    margin-top: 30px;
    padding: 0 15px;
    max-width: $grid-size;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    .dummy-item {
        width: 25%;
        width: calc(25% - 30px);
        height: 300px;
        margin: 0 15px;
    }
}
.footer {
    max-width: $grid-size;
    margin-left: auto;
    margin-right: auto;
    padding: 0 30px;
    margin-top: auto;
    margin-bottom: 7.5px;
    .dummy-text {
        width: 200px;
        margin-left: auto;
        margin-right: auto;
        height: 10px;
        padding: 0px;
        @media screen and(min-width: 768px) {
            width: 400px;
        }
    }
}
</style>

<template>
    <div id="app">
        <div class="can-tour-blur content">
            <div class="navbar">
                <div class="dummy dummy-logo">Logo</div>
                <div class="dummy dummy-search">Search...</div>
                <div class="dummy dummy-profile"></div>
                <div class="dummy dummy-profile-text"></div>
            </div>
            <div class="crumbs">
                <div class="dummy dummy-crumb"></div>
                <div class="dummy dummy-crumb-text"></div>
                <div class="dummy dummy-btn">Create</div>
            </div>
            <div class="page">
                <div class="dummy dummy-item"></div>
                <div class="dummy dummy-item"></div>
                <div class="dummy dummy-item"></div>
                <div class="dummy dummy-item"></div>
            </div>
            <div class="footer">
                <div class="dummy dummy-text"></div>
            </div>
        </div>
        <tour :steps="steps" :text="text" :theme="theme" :debug="true" :start-large="true">
            <template slot="step-1"> <a href="#">Custom slot 1</a> </template>
        </tour>
    </div>
</template>

<script>
import Tour from './components/tour.vue'

export default {
    name: 'app',
    components: { Tour },
    data: () => ({
        steps: [
            {
                preview: './example-1.png',
                title: 'Step 1',
                description: 'I am an example step, click in the top right corner to enlarge me. Click next if you no longer want to see me. I am an example step, click in the top right corner to enlarge me. Click next if you no longer want to see me. I am an example step, click in the top right corner to enlarge me. Click next if you no longer want to see me. I am an example step, click in the top right corner to enlarge me. Click next if you no longer want to see me. I am an example step, click in the top right corner to enlarge me. Click next if you no longer want to see me.',
            },
            {
                preview: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Pizigani_1367_Chart_10MB.jpg',
                title: 'Step 2',
                description: 'Hello, I\'m the second step I look like the first step but you can go both back and forth.',
                next_cta: 'Next',
                prev_cta: 'Custom prev'
            },
            {
                preview: './Kanban-example.gif',
                title: 'Step 3',
                description: 'Congratz, I am the second step in this 3 step tuturial. If you reached me that means you have reached the end.',
            },
        ],
        text: {
            next_cta: 'Next',
            prev_cta: 'Previous',
            restart_cta: 'Restart'
        },
        theme: {
            color: '#009de0',
            radius: '2px'
        }
    })
}
</script>
