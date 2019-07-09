<title>Posts</title>
<!-- <div class="relative box-post">
    <div class="absolute left-content ct">
        <a class="relative" href="#">Title</a>
        <div class="relative created_at">Created at : dd/mm/yy</div>
    </div>
    <div class="absolute right-content ct">
        <a class="relative" href="#"><div class="title">Title</div></a>
        <div class="relative created_at">Created at : dd/mm/yy</div>
    </div>
</div> -->
<?php 
    /**
     * Function substr là cắt từ đâu đến đâu của string rồi return kết quả
     */
?>
<?php
    for($i=0;$i<count($data['posts']);$i+=2){
        echo "<div class='relative box-post'>";
        echo "<div class='absolute left-content ct'>";
        echo "<a class='relative' href='showpost/".$data['posts'][$i]['id']."/".$data['posts'][$i]['title']."'>".substr($data['posts'][$i]['title'],0,50)."</a>";
        echo "<div class='relative created_at'>Created at: ".$data['posts'][$i]['created_at']."</div>";
        echo "</div>";
        if (isset($data['posts'][$i+1])){
            echo "<div class='absolute right-content ct'>";
            echo "<a class='relative' href='showpost/".$data['posts'][$i+1]['id']."/".$data['posts'][$i+1]['title']."'>".substr($data['posts'][$i+1]['title'],0,50)."</a>";
            echo "<div class='relative created_at'>Created at: ".$data['posts'][$i+1]['created_at']."</div>";
            echo "</div>";
            echo "</div>";
        }
    }
