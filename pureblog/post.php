<?php 
    include "layout.php";
?>
<title>SinglePost</title>
<?php
    if (isset($_SESSION['logged'])){
        printf("<div class='absolute box-btn-update'>");
        printf("<form method='POST' action=''>");
        printf("<input class='btn fix-btn' type='submit' name='update' value='Update'>");
        printf("<input class='btn del-btn' type='submit' name='delete' value='Delete'>");
        printf("</form>");
        printf("</div>");
    }
    if (isset($_POST['delete'])){
        // mysqli_query($conn,"DELETE FROM posts WHERE id = ".$data['id']." ");
        // mysqli_commit($conn);
        // header("Location: /posts.php");
        echo "<form method='POST'>";
        echo "<div class='absolute box-delete'>";
        echo "<center><strong><p>Are you sure?</p></strong><center>";
        echo "<input class='btn del-btn' type='submit' name='yes' value='Yes'>";
        echo "<input class='btn fix-btn'type='submit' name='no' value='No'>";
        echo "</div>";
        echo "</form>";
    }
    if (isset($_POST['yes'])){
        mysqli_query($conn,"DELETE FROM posts WHERE id =".$_GET['id']." ;");
        mysqli_commit($conn);
        header("Location: /posts.php");
    }
    if (isset($_POST['no'])){
        header("Location: /post.php?id=".$_GET['id']." ");
    }
?>
<?php 
    $url = $_SERVER['REQUEST_URI'];
    $filename = $_SERVER['PHP_SELF'];
    $id = str_split($url,strlen($filename)+4);
    $result = mysqli_query($conn,"SELECT * FROM posts WHERE id=".$id[1]." ");
    if (mysqli_num_rows($result)==0){
        echo "<h1>No post in this ID</h1>";
    }
    else{
        $data = mysqli_fetch_assoc($result);
        echo "<div class='relative single-post'>";
        echo "<center><h2>".$data['title']."</h2></center>";
        echo "<p>Created at : ".$data['created_at']."</p>";
        echo "<div>".$data['content']."</div>";
        echo "</div>";
    }
    if (isset($_POST['update'])){
        unset($_POST['update']);
        header("Location: /update.php?id=".$id[1]."");
    }
?>