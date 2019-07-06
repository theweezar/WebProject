<?php 
    session_start();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <?php
        echo "<style>";
        require_once "css/main.css";
        echo "</style>";
    ?>
</head>
<body>
    <nav>
        <ul>
            <?php 
                echo "<li id='home' class=''><a href='/'>Trang chủ</a></li>";
                echo "<li class=''><a href='/aboutme'>About me</a></li>";
                echo "<li class=''><a href='/posts_index'>Posts</a></li>";
                if (isset($_SESSION['logged'])) {
                    echo "<li class=''><a href='/create_post'>Create Post</a></li>";
                    echo "<li class=''><a href='/logout'>Logout</a></li>";
                }
                else echo "<li class=''><a href='/login'>Login</a></li>"
            ?>
        </ul>
    </nav>
    <div class="relative right view">
    <?php
        require_once "../app/init.php";
        $app = new App;
    ?>    
    </div>
    <?php 
        echo "<script>";
        echo "document.getElementById('".$app->idjs."').classList.add('light');";
        echo "</script>";
    ?>
</body>
</html>



