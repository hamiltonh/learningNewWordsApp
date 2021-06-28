// extension vscode vetur 
<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand"> <b> >Learning Words with Nico!</b> </a>
        </nav>
        <div class="container">
            <div class="row pt-5">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="saveWord">
                                <div class="form-group">
                                    <input type="text" placeholder="Enter word.." class="form-control" v-model="word.text" required>
                                </div>
                                <template v-if="toEdit">
                                    <button class="btn btn-primary btn-block form-control"> Update </button>
                                </template>
                                <template v-else>
                                    <button class="btn btn-primary btn-block form-control"> Save </button>
                                </template>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <table class="table table-bordered table-hover table_content">
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>Definitions</th>
                                <th>Related image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="word of words" :key="word.title">
                                <td>{{word.text}}</td>
                                <td></td>
                                <td>
                                    <!-- <span v-for="image of word.image_url" >
                                        <img class="img-word" :src=image alt="" height="80px">
                                        <small>X</small>
                                    </span> -->
                                    <img class="img-word" :src=word.url_repository+word.id_image alt="" height="80px">
                                    
                                </td>
                                <td>
                                    <button @click = "deleteWord(word._id)" class="btn btn-danger btn-sm">
                                        Delete
                                    </button>
                                    <button @click = "editWord(word._id)" class="btn btn-secondary btn-sm">
                                        Update
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>  

<script>

class Word {
    constructor(text = '', created_at = new Date()) {
        this.text = text
        this.created_at = created_at
    }
}

export default {

    data() {
        return {
             word: new Word(),
             words: [],
             toEdit: false,
             idWordToEdit: ''
        }
    },
    created(){
        this.getWords() 
    },
    methods:{
        saveWord(){
            
            if(!this.toEdit){

                fetch('api/tasks', {
                    method: 'post',
                    body: JSON.stringify(this.word),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })    
                .then(res => res.json())
                .then(data => {
                    this.getWords() 
                    this.word = new Word()
                })

            } else {
                console.log('To update..', this.idWordToEdit)
                 fetch('api/tasks/'+this.idWordToEdit, {
                    method: 'PUT',
                    body: JSON.stringify(this.word),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })    
                .then(res => res.json())
                .then(data => {
                    this.getWords() 
                    this.toEdit = false
                    this.word = new Word()
                })
            }
        },
        getWords(){
            
            fetch( 'api/tasks', )
                .then(res => res.json())
                .then(data => {
                    this.words = data
                    // console.log(this.words)
                })

        },
        deleteWord( id ){
            // console.log('id',id);
            fetch( 'api/tasks/'+id ,{
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.getWords() 
            })

        },
        editWord(id){

            // console.log('Editing!')
            fetch('api/tasks/'+id)    
            .then(res => res.json())
            .then(data => {
                this.word = new Word(data.text)
                this.toEdit = true
                this.idWordToEdit = data._id
            })

        }
    }
}
</script>
