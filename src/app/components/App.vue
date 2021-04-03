// extension vscode vetur 
<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand"> <b>>Learning Words with Nico!</b> </a>
        </nav>
        <div class="container">
            <div class="row pt-5">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="saveWord">
                                <div class="form-group">
                                    <input type="text" placeholder="Insert word.." class="form-control" v-model="word.text">
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
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>Already Learned?</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="word of words" :key="word.title">
                                <td>{{word.text}}</td>
                                <td></td>
                                <td>
                                    <button @click = "deleteWord(word._id)" class="btn btn-danger">
                                        Delete
                                    </button>
                                    <button @click = "editWord(word._id)" class="btn btn-secondary">
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

//const axios = require("axios")
//  axios.defaults.crossDomain = true;

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
                    console.log(this.words)
                })

                     //Images
                    // fetch( 'http://glyffix.com/api/Image?word=dream', {
                    //     method: 'POST',
                    //     // mode:'no-cors',
                    //     headers: {
                    //         'Accept': 'application/json',
                    //         'Content-Type': 'application/json',
                    //         'Access-Control-Allow-Origin': '*',
                    //         'Access-Control-Allow-Headers': '*',
                    //         'Access-Control-Allow-Methods': 'get'
                    //     }
                    // })
                    // .then(res => console.log(res))
                    // .then(data => {
                    //     console.log(data,'FIN')
                    // })
                    // .catch(err => console.log(err))

                    // axios.get('http://glyffix.com/api/Image?word=dream')
                    // .then(res=> console.log(res))
                    // .catch(err => console.log(err))

                    // Images
                    // fetch( 'http://glyffix.com/api/Image?word=dream', {
                    //     method: 'GET',
                    //     // mode:'no-cors',
                    //     headers: {
                    //         'Accept': 'application/json',
                    //         'Content-Type': 'application/json',
                    //         'Access-Control-Allow-Origin': '*',
                    //         'Access-Control-Allow-Headers': '*',
                    //         'Access-Control-Allow-Methods': 'get',
                    //          mode: "cors",
                    //          cache: "default"
                    //     }
                    // })
                    // .then(res => console.log(res))
                    // .then(data => {
                    //     console.log(data,'FIN')
                    // })
                    // .catch(err => console.log(err))

        },
        deleteWord( id ){
            console.log('id',id);
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

//http://glyffix.com/api/Image?word=dream