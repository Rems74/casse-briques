
class Tableau1 extends Phaser.Scene {


    preload() {
        this.load.image('circle','assets/rond.png')
        this.load.image('square','assets/carre.png')
    }


    create() {

        this.hauteur=800
        this.largeur=800

        //Barre Haut
        this.haut=this.physics.add.image(this.hauteur/1000,0,'square').setOrigin( 0, 0);
        this.haut.setDisplaySize(this.largeur,20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);


        //Barre droite
        this.oui=this.physics.add.image(0,this.largeur/1000,'square').setOrigin( 0, 0);
        this.oui.setDisplaySize(20,this.largeur);
        this.oui.body.setAllowGravity(false);
        this.oui.setImmovable(true);


        //Barre gauche
        this.non=this.physics.add.image(780,10,'square').setOrigin( 0, 0);
        this.non.setDisplaySize(20,this.largeur);
        this.non.body.setAllowGravity(false);
        this.non.setImmovable(true);


        //Balle

        this.balle=this.physics.add.image(this.largeur/2,this.hauteur/2,'circle').setOrigin(0,0)
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.2,1.2)
        this.balle.setVelocity(300)
        this.balle.setVelocityX(Phaser.Math.Between(0,0))
        this.balle.setVelocityY(Phaser.Math.Between(800,0))
        this.balle.body.setMaxVelocityY(200,200)



        //Raquette

        this.gauche=this.physics.add.image(this.largeur/2-100,this.hauteur-60,'square').setOrigin( 0, 0);
        this.gauche.setDisplaySize(200,20);
        this.gauche.body.setAllowGravity(false)
        this.gauche.setImmovable(true)
        this.gauche.body.setVelocityY(0);
        this.gauche.setTintFill(0xffffff)

        //Briques

        this.bricks=this.physics.add.image(100,250,'square').setOrigin( 0, 0);
        this.bricks.setDisplaySize(60,30);
        this.bricks.body.setAllowGravity(false)
        this.bricks.setImmovable(true)

        this.bricks2=this.physics.add.image(165,250,'square').setOrigin( 0, 0);
        this.bricks2.setDisplaySize(60,30);
        this.bricks2.body.setAllowGravity(false)
        this.bricks2.setImmovable(true)

        this.bricks3=this.physics.add.image(230,250,'square').setOrigin( 0, 0);
        this.bricks3.setDisplaySize(60,30);
        this.bricks3.body.setAllowGravity(false)
        this.bricks3.setImmovable(true)

        this.bricks4=this.physics.add.image(295,250,'square').setOrigin( 0, 0);
        this.bricks4.setDisplaySize(60,30);
        this.bricks4.body.setAllowGravity(false)
        this.bricks4.setImmovable(true)

        this.bricks5=this.physics.add.image(360,250,'square').setOrigin( 0, 0);
        this.bricks5.setDisplaySize(60,30);
        this.bricks5.body.setAllowGravity(false)
        this.bricks5.setImmovable(true)

        this.bricks6=this.physics.add.image(425,250,'square').setOrigin( 0, 0);
        this.bricks6.setDisplaySize(60,30);
        this.bricks6.body.setAllowGravity(false)
        this.bricks6.setImmovable(true)

        this.bricks7=this.physics.add.image(490,250,'square').setOrigin( 0, 0);
        this.bricks7.setDisplaySize(60,30);
        this.bricks7.body.setAllowGravity(false)
        this.bricks7.setImmovable(true)

        this.bricks8=this.physics.add.image(555,250,'square').setOrigin( 0, 0);
        this.bricks8.setDisplaySize(60,30);
        this.bricks8.body.setAllowGravity(false)
        this.bricks8.setImmovable(true)

        this.bricks9=this.physics.add.image(620,250,'square').setOrigin( 0, 0);
        this.bricks9.setDisplaySize(60,30);
        this.bricks9.body.setAllowGravity(false)
        this.bricks9.setImmovable(true)


        //Physique

        let me=this;

        this.physics.add.collider(this.balle,this.oui);

        this.physics.add.collider(this.balle,this.non);

        this.physics.add.collider(this.balle,this.haut);

        this.physics.add.collider(this.balle,this.gauche, function(){
            me.rebond(me.gauche)

        });

        this.physics.add.collider(this.balle,this.bricks, function(){
            me.rebond(me.bricks)
        });

        this.physics.add.collider(this.balle,this.bricks2, function(){
            me.rebond(me.bricks2)
        });

        this.physics.add.collider(this.balle,this.bricks3, function(){
            me.rebond(me.bricks3)
        });

        this.physics.add.collider(this.balle,this.bricks4, function(){
            me.rebond(me.bricks4)
        });

        this.physics.add.collider(this.balle,this.bricks, function(){
            me.rebond(me.bricks)
        });


        //Pour compter les points

        this.joueur = new Joueur('P1','jGauche');

        this.initKeyboard();
    }

    rebond(raquette){

        let me=this;

        console.log(raquette.x)
        console.log(me.balle.x)
        console.log((me.balle.x)-(raquette.x))

        let hauteurRaquette = raquette.displayWidth;

        let positionRelativeRaquette =(this.balle.x-raquette.x);

        positionRelativeRaquette = (positionRelativeRaquette/hauteurRaquette);

        positionRelativeRaquette = (positionRelativeRaquette*2-1);
        console.log(positionRelativeRaquette);

        this.balle.setVelocityX( /*this.balle.body.velocity.x*/ + positionRelativeRaquette * hauteurRaquette/2)

    }


    win(joueur){
        joueur.score ++;
    }

    //Initialisation touches


    initKeyboard(){


        let me=this;
        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.LEFT:

                        me.gauche.body.setVelocityX(-400);

                    break;


                case Phaser.Input.Keyboard.KeyCodes.RIGHT:

                        me.gauche.body.setVelocityX(400);

                    break;
            }
        });

        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.gauche.body.setVelocityX(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.gauche.body.setVelocityX(0);
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


            if(this.balle.x < 0){
                this.win(this.jDroite);
                this.balle.x = this.largeur/2;
                this.balle.y = this.hauteur/2;
                this.balle.body.setVelocityX(Phaser.Math.Between(-300,300));
                this.balle.body.setVelocityY(Phaser.Math.Between(-300,300));
            }


            if(this.balle.y < 0){
                this.balle.y = 0
            }
            if(this.balle.y > this.hauteur){
                this.balle.y = this.hauteur
            }


        }

    }

