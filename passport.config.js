const LocalStrategy = require('passport-local').Strategy;

function initialize(passport,getUserByEmail,getUserById){
    const authenticateUser = (email,password,done) =>{
        const user = getUserByEmail(email)

        if(user == null){
            return done(null,false,{message:'No user with that email'})
        }

        try{
            if(password){
                return done(null,user)

            }else{
                return done(null,false,{message:'Password Incorret'})
            }

        }catch (err){
            return done(err)
        }

    }


    passport.use(new LocalStrategy({usernameField:'email'},authenticateUser));
    passport.serializeUser(function(user, done) { done(null,user.id)});  
    passport.deserializeUser(function(id, done) {
      return  done(null,getUserById(id))
    });
}

module.exports = initialize;
