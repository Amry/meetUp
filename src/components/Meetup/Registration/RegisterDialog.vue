<template>
    	<v-dialog persistent v-model="registerDialog">
            <v-btn primary accent slot="activator">
                {{ isRegistered ? 'Unregister' : 'Register'}}
            </v-btn>
            <v-card>
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card-title v-if="isRegistered">Unregister from the Meetup</v-card-title>
                            <v-card-title v-else>Register to the Meetup</v-card-title>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card-text>You can change it later on</v-card-text>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-btn 
                                class="red--text darken-1"
                                flat
                                @click="registerDialog = false">
                                Cancel
                            </v-btn>
                            <v-btn 
                                class="blue--text darken-1"
                                flat
                                @click="onConfirm">
                                Confirm
                            </v-btn>
                        </v-flex>
                    </v-layout>                    
                </v-container>
            </v-card>
        </v-dialog>
</template>

<script>
    export default {
        props: ['meetupId'],
        data() {
            return {
                registerDialog: false
            }
        },
        computed: {
            isRegistered() {
                return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
                    return meetupId === this.meetupId
                }) >= 0
            }
        },
        methods: {
            onConfirm() {
                if (this.isRegistered) {
                    this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
                } else {
                    this.$store.dispatch('registerUserForMeetup', this.meetupId)
                }
                this.registerDialog = true
            }
        }
    }
</script>
