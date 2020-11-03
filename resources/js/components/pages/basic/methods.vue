<template>
    <div>
        <h1>Item counter: {{ views }}</h1>
        <button @click="updateCounter(1)">Increase</button>
        <button @click="updateCounter(-1)">Decrease</button>

        <br>
        <br><br>

        <div v-for="(blog, i) in blogs" :key="i" v-if="blogs.length">
            <h1>{{ blog.title }}</h1>
            <p>{{ blog.post }}</p>
        </div>

        <div>
            <h1 v-if="showItems">show this item if "showItems" is true</h1>
            <h1 v-else>show this item if "showItems" is false</h1>
        </div>

        <button @click="showItems = !showItems">Change showItems</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            views: 0,
            blogs: [],
            showItems: false,
        }
    },

    methods: {
        updateCounter(number){
            this.views += number
        }
    },

    created(){
        // call the server to get the views of this blog post..
        this.views = 100
        // get the blog posts
        let posts = [{title: 'this is blog title 1', post: 'this is blog post 1', id: 1},
                {title: 'this is blog title 2', post: 'this is blog post 2', id: 2},
                {title: 'this is blog title 3', post: 'this is blog post 3', id: 3},
                {title: 'this is blog title 4', post: 'this is blog post 4', id: 4}]
            
        this.blogs = posts
    }
}
</script>