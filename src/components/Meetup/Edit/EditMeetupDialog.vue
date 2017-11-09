<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <v-btn fab accent slot="activator">
            <v-icon>edit</v-icon>                    
        </v-btn>
        <v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-title>Edit Meetup</v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-text>
                        <v-text-field 
                                name="title"
                                label="Title"
                                id="title"
                                v-model="editedTitle"
                                required>
                        </v-text-field>
                        <v-text-field 
                                name="description"
                                label="Description"
                                id="description"
                                multi-line
                                v-model="editedDescription"
                                required>
                            </v-text-field>  
                    </v-card-text>
                    <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="dateMenu"
                                transition="scale-transition"
                                offset-y
                                full-width
                                :nudge-right="40"
                                max-width="290px"
                                min-width="290px">
                                <v-text-field
                                    slot="activator"
                                    label="Pick a date"
                                    v-model="editableDate"
                                    prepend-icon="event"
                                    readonly
                                ></v-text-field>
                                <v-date-picker v-model="editableDate" no-title scrollable actions>
                                <template scope="{ save, cancel }">
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="save">OK</v-btn>
                                    </v-card-actions>
                                </template>
                                </v-date-picker>
                    </v-menu>
                    <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="timeMenu"
                                transition="scale-transition"
                                offset-y
                                full-width
                                :nudge-right="40"
                                max-width="290px"
                                min-width="290px"
                            >
                                <v-text-field
                                slot="activator"
                                label="Pick a time"
                                v-model="editableTime"
                                prepend-icon="access_time"
                                readonly
                                ></v-text-field>
                                <v-time-picker format="24hr" v-model="editableTime" autosave></v-time-picker>
                            </v-menu>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-actions>
                        <v-btn 
                            flat 
                            class="blue--text darken-1" 
                            @click="editDialog=false">
                                Close
                            </v-btn>
                        <v-btn 
                            flat 
                            class="blue--text darken-1"
                            :disabled="!isValid" 
                            @click="onSaveChanges">
                                Save
                            </v-btn>
                    </v-card-actions>
                </v-flex>
            </v-layout>                    
        </v-container>
        </v-card>
    </v-dialog>
</template>

<<script>
    export default {
        props: ['meetup'],
        data() {
            return {
                editDialog: false,
                editedTitle: this.meetup.title,
                editedDescription: this.meetup.description,
                editableDate: null,
                editableTime: null,
                timeMenu: '',
                dateMenu: ''
            }
        },
        computed: {
            isValid() {
                return this.editedTitle.trim() !== '' &&
                    this.editedDescription.trim() !== ''
            }
        },
        methods: {
            onSaveChanges() {
                if (!this.isValid) {
                    return
                }
                const newDate = new Date(this.meetup.date)
                const newDay = new Date(this.editableDate).getUTCDate()
                const newMonth = new Date(this.editableDate).getUTCMonth()
                const newYear = new Date(this.editableDate).getUTCFullYear()
                newDate.setUTCDate(newDay)
                newDate.setUTCMonth(newMonth)
                newDate.setUTCFullYear(newYear)
                const hours = this.editableTime.match(/^(\d+)/)[1]
                const minutes = this.editableTime.match(/:(\d+)/)[1]
                newDate.setHours(hours)
                newDate.setMinutes(minutes)
                this.editDialog = false
                this.$store.dispatch('updateMeetupData', {
                    id: this.meetup.id,
                    title: this.editedTitle,
                    description: this.editedDescription,
                    date: newDate
                })
            }
        },
        created() {
            this.editableDate = new Date(this.meetup.date)
            this.editableTime = new Date(this.meetup.date).toTimeString()
        }
    }
</script>
