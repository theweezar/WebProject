<?php 
    session_start();
    ob_start();
    if ($_SERVER['PHP_SELF']=="/layout.php") header("Location: home.php");
    include_once "mysql/conn.php";
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- <title>Layout</title> -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" href="static/Pure-Logo-Web.png">
    <?php
        // include_once "mysql/conn.php"; 
        // $file_static = @fopen("static/main.css","r"); // Đọc file giống C 
        // $css = fread($file_static,filesize("static/main.css"));
        // echo "<style>$css</style>";
        echo "<style>";
        require_once "static/main.css";
        echo "</style>";
    ?>
</head>
<body>
    <div class="wallpaper"></div>
    <nav>
        <ul>
            <li class='left'><a href='/home.php'>Homepage</a></li>
            <li class='left'><a href='/posts.php'>Post</a></li>
            <?php 
                if (isset($_SESSION['logged'])){
                    if ($_SESSION['logged']==true){
                        echo "<li class='right'><a href='/logout.php'>Logout</a></li>";
                        echo "<li class='right'><a href='/create.php'>Create Post</a></li>";
                    }
                    if ($_SESSION['func']=='admin'){
                        echo "<li class='right'><a href='/register.php'>Register</a></li>";
                        echo "<li class='right'><a href='/listusers.php'>List Author</a></li>";
                    }
                }
                else{
                    echo "<li class='right'><a href='/login.php'>Login</a></li>";
                }
            ?>
        </ul>
    </nav>
</body>
</html>