
class Tableau1 extends Phaser.Scene {


    preload() {
        this.load.image('circle','assets/moon.png')
        this.load.image('square','assets/carre.png')
        this.load.image('space','assets/space.jpg')
        this.load.image('ovni1','assets/soucoupe_1.png')
        this.load.image('ovni2','assets/soucoupe_2.png')
        this.load.image('aster','assets/asteroides.png')
        this.load.audio('balle','assets/balle.mp3')
        this.load.audio('vic','assets/victoire.mp3')
    }


    create() {

        this.vic= this.sound.add('vic', {loop: false});
        this.vic.volume = 1

        this.hauteur=500
        this.largeur=1000

        let Space=this.add.image(0,0,'space').setOrigin(0,0);
        Space.scale=1.2

        //Barre Haut
        this.haut=this.physics.add.image(0,0,'square').setOrigin( 0, 0);
        this.haut.setDisplaySize(this.largeur,20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);
        this.haut.setTintFill(0x000000);
        let Aster=this.add.image(0,50,'aster').setOrigin(0,0);

        //Barre Bas
        this.bas=this.physics.add.image(0,this.hauteur-20,'square').setOrigin( 0, 0);
        this.bas.setDisplaySize(this.largeur,20);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true);
        this.bas.setTintFill(0x000000)

        //Balles

        this.balle=this.physics.add.image(this.largeur/2,this.hauteur/2,'circle').setOrigin(0,0)
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.2,1.2)
        this.balle.setVelocity(300)
        this.balle.setVelocityX(Phaser.Math.Between(-200,0))
        this.balle.setVelocityY(Phaser.Math.Between(0,0))
        this.balle.body.setMaxVelocityY(200,200)


        this.balle2=this.physics.add.image(this.largeur/2,this.hauteur/2,'circle').setOrigin(0,0)
        this.balle2.setDisplaySize(20,20);
        this.balle2.body.setBounce(1.2,1.2)
        this.balle2.setVelocity(300)
        this.balle2.setVelocityX(Phaser.Math.Between(0,200))
        this.balle2.setVelocityY(Phaser.Math.Between(0,0))
        this.balle2.body.setMaxVelocityY(200,200)



        //Raquette Droite

        this.droite=this.physics.add.image(this.largeur-70,this.hauteur/2-50,'ovni2').setOrigin( 0, 0);
        this.droite.setDisplaySize(60,100);
        this.droite.body.setAllowGravity(false)
        this.droite.setImmovable(true)
        this.droite.body.setVelocityY(0);


        //Raquette Gauche

        this.gauche=this.physics.add.image(10,this.hauteur/2-50,'ovni1').setOrigin( 0, 0);
        this.gauche.setDisplaySize(60,100);
        this.gauche.body.setAllowGravity(false)
        this.gauche.setImmovable(true)
        this.gauche.body.setVelocityY(0);

        //Physique

        let me=this;

        this.physics.add.collider(this.balle,this.bas, function(){
            me.sound.play('balle');
        });

        this.physics.add.collider(this.balle2,this.bas, function(){
            me.sound.play('balle');
        });

        this.physics.add.collider(this.balle,this.haut, function(){
            me.sound.play('balle');
        });

        this.physics.add.collider(this.balle2,this.haut, function(){
            me.sound.play('balle');
        });

        this.physics.add.collider(this.balle,this.droite, function(){
            me.rebond(me.droite)
            me.sound.play('balle');
        });

        this.physics.add.collider(this.balle2,this.droite, function(){
            me.rebond2(me.droite)
            me.sound.play('balle');
        });

        this.physics.add.collider(this.balle,this.gauche, function(){
            me.rebond(me.gauche)
            me.sound.play('balle');
        });

        this.physics.add.collider(this.balle2,this.gauche, function(){
            me.rebond2(me.gauche)
            me.sound.play('balle');
        });

        this.physics.add.collider(this.balle,this.balle2, function(){
            me.rebond(me.balle)
            me.rebond2(me.balle2)
            me.sound.play('balle');
        });



        //Pour compter les points

        this.jGauche = new Joueur('P1','jGauche');
        this.jDroite = new Joueur('P2','jDroite');

        this.initKeyboard();
    }

    rebond(raquette){

        let me=this;

        console.log(raquette.y)
        console.log(me.balle.y)
        console.log((me.balle.y)-(raquette.y))

        let hauteurRaquette = raquette.displayHeight;

        let positionRelativeRaquette =(this.balle.y-raquette.y);

        positionRelativeRaquette = (positionRelativeRaquette/hauteurRaquette);

        positionRelativeRaquette = (positionRelativeRaquette*2-1);
        console.log(positionRelativeRaquette);

        this.balle.setVelocityY( this.balle.body.velocity.y + positionRelativeRaquette * hauteurRaquette)

    }

    rebond2(raquette){

        let me=this;

        console.log(raquette.y)
        console.log(me.balle2.y)
        console.log((me.balle2.y)-(raquette.y))

        let hauteurRaquette2 = raquette.displayHeight;

        let positionRelativeRaquette2 =(this.balle2.y-raquette.y);

        positionRelativeRaquette2 = (positionRelativeRaquette2/hauteurRaquette2);

        positionRelativeRaquette2 = (positionRelativeRaquette2*2-1);
        console.log(positionRelativeRaquette2);

        this.balle2.setVelocityY( this.balle2.body.velocity.y + positionRelativeRaquette2 * hauteurRaquette2)

    }

    win(joueur){
        joueur.score ++;

        this.vic.play();
    }

    //Initialisation touches


    initKeyboard(){

        let me=this;
        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    if(me.gauche.y < me.haut.y+20){
                        me.gauche.setVelocityY(0)
                    }
                    else {
                        me.gauche.body.setVelocityY(-400);
                    }
                    break;


                case Phaser.Input.Keyboard.KeyCodes.X:
                    if(me.gauche.y > me.bas.y-100){
                        me.gauche.setVelocityY(0)
                    }else {
                        me.gauche.body.setVelocityY(400);
                    }
                    break;


                case Phaser.Input.Keyboard.KeyCodes.J:
                    if(me.droite.y < me.haut.y+20){
                        me.droite.setVelocityY(0)
                    }
                    else{
                        me.droite.body.setVelocityY(-400);
                    }
                    break;


                case Phaser.Input.Keyboard.KeyCodes.N:
                    if(me.droite.y > me.bas.y-100){
                        me.droite.setVelocityY(0)
                    }else {
                        me.droite.body.setVelocityY(400);
                    }
                    break;
            }
        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.gauche.body.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.gauche.body.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.droite.body.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.droite.body.setVelocityY(0);
                    break;
            }
        });
    }

        update(){

            if(this.balle.x > this.largeur){
                this.win(this.jGauche);
                this.balle.x = this.largeur/2;
                this.balle.y = this.hauteur/2;
                this.balle.body.setVelocityX(Phaser.Math.Between(-300,300));
                this.balle.body.setVelocityY(Phaser.Math.Between(-300,300));
            }

            if(this.balle2.x > this.largeur){
                this.win(this.jGauche);
                this.balle2.x = this.largeur/2;
                this.balle2.y = this.hauteur/2;
                this.balle2.body.setVelocityX(Phaser.Math.Between(-300,300));
                this.balle2.body.setVelocityY(Phaser.Math.Between(-300,300));
            }

            if(this.balle.x < 0){
                this.win(this.jDroite);
                this.balle.x = this.largeur/2;
                this.balle.y = this.hauteur/2;
                this.balle.body.setVelocityX(Phaser.Math.Between(-300,300));
                this.balle.body.setVelocityY(Phaser.Math.Between(-300,300));
            }

            if(this.balle2.x < 0){
                this.win(this.jDroite);
                this.balle2.x = this.largeur/2;
                this.balle2.y = this.hauteur/2;
                this.balle2.body.setVelocityX(Phaser.Math.Between(-300,300));
                this.balle2.body.setVelocityY(Phaser.Math.Between(-300,300));
            }
            if(this.balle.y < 0){
                this.balle.y = 0
            }
            if(this.balle.y > this.hauteur){
                this.balle.y = this.hauteur
            }

            if(this.balle2.y < 0){
                this.balle2.y = 0
            }
            if(this.balle2.y > this.hauteur){
                this.balle2.y = this.hauteur
            }

        }

    }

