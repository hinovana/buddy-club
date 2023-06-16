
const DWEEKS  = ['月','火','水','木','金','土','日'];
const TIMES = ['15:00', '16:00', '17:00'];
const DISCOUNTS = [0, -3600, -5400, -9000, -10800, -12000];

const CLUB_DATA_TSV = `
サッカー	クラブ	シニア	水	15:00	550	8250	11000			
サッカー	クラブ	シニア	月	16:00						
器械体操	スクール	シニア	火	15:00	550	8250	11000			
器械体操	スクール	シニア	水	16:00						
器械体操	スクール	シニア	金	15:00						
器械体操	スクール	シニア	金	16:00						
ドッヂボール	クラブ	シニア	火	15:00	550	8250	11000
バスケ	クラブ	シニア	火	16:00	550	8250	11000			
バスケ	クラブ	シニア	木	15:00						
バスケ	クラブ	シニア	金	15:00						
陸上	クラブ	シニア	月	15:00	550	8250	11000	13750	16500	19250
陸上	クラブ	シニア	火	15:00						
陸上	クラブ	シニア	水	15:00						
陸上	クラブ	シニア	木	16:00						
陸上	クラブ	シニア	金	16:00						
柔道	クラブ	シニア	月	15:00	550	8250	11000	13750	16500	19250
柔道	クラブ	シニア	水	15:00						
柔道	クラブ	シニア	金	15:00						
テニス	クラブ	シニア	月	15:00	550	9350	12650			
テニス	クラブ	シニア	火	15:00						
テニス	クラブ	シニア	水	15:00						
テニス	クラブ	シニア	月	16:00						
テニス	クラブ	シニア	火	16:00						
テニス	クラブ	シニア	木	16:00						
テニス	クラブ	シニア	金	16:00						
野球	クラブ	シニア	月	15:00	550	9350	12100			
野球	クラブ	シニア	火	15:00						
野球	クラブ	シニア	水	16:00						
ボルダリング	クラブ	シニア	月	15:00	550	10550	16550	21550		
ボルダリング	クラブ	シニア	水	15:00						
ボルダリング	クラブ	シニア	金	15:00						
ボルダリング	クラブ	シニア	月	16:00						
ボルダリング	クラブ	シニア	木	16:00						
ダンス	クラブ	シニア	月	16:00	550	8250	11000			
ダンス	クラブ	シニア	金	15:00						
英会話:初級	スクール	シニア	月	15:00	550	9350	13750	20350		
英会話:初級	スクール	シニア	火	15:00						
英会話:初級	スクール	シニア	水	15:00						
英会話:初級	スクール	シニア	木	15:00						
英会話:初級	スクール	シニア	金	15:00						
英会話:中級	スクール	シニア	月	16:00	550	9350	13750	20350		
英会話:中級	スクール	シニア	火	16:00						
英会話:中級	スクール	シニア	水	16:00						
英会話:中級	スクール	シニア	水	16:00						
英会話:中級	スクール	シニア	金	16:00						
明光キッズ:学習	スクール	シニア	月	17:00	880	10450				
明光キッズ:学習	スクール	シニア	金	17:00						
明光キッズ:思考力	スクール	シニア	水	16:00	880	10450				
明光キッズ:思考力	スクール	シニア	水	17:00						
自然科学教室	スクール	シニア	金	16:00	550	8250				
プログラミング	スクール	シニア	木	15:00	1100	8250				
プログラミング	スクール	シニア	木	16:00						
FUNAJUKU	スクール	シニア	火	16:00	0	9350	13750			
FUNAJUKU	スクール	シニア	木	16:00						
EL PIBE	スクール	シニア	月	15:00	0	8250	12650			
EL PIBE	スクール	シニア	金	15:00						
ハンドボール	スクール	シニア	木	16:00	0	8250				
フラグフットボール	スクール	シニア	金	16:00	0	9350				
フラグフットボール	スクール	シニア	金	17:00						
英語フラグフットボール	スクール	シニア	木	16:00	0	11550				
レスリング	スクール	シニア	月	15:00	0	8550	12550	12550	12550	
レスリング	スクール	シニア	火	15:00						
レスリング	スクール	シニア	水	15:00						
レスリング	スクール	シニア	金	15:00						
体操アクロバット	スクール	シニア	月	15:00	0	10450	15950			
体操アクロバット	スクール	シニア	木	16:00						
ラグビー	スクール	シニア	月	15:00	0	8250				
`;

const CLUB_ZAPPI = {
  'サッカー': [ { name: 'グラウンド使用料', amounts: [ 1100, 1650, 2200, ], }, ],
};

const helper = {
  encodeHash(obj) {
    return btoa(encodeURIComponent(JSON.stringify(obj)));
  },
  decodeHash(str) {
    return JSON.parse(decodeURIComponent(atob(str)));
  },
};

const club_data_ary = CLUB_DATA_TSV.trim().split(/\n/).map(x => x.split(/\t/));

const club_data = club_data_ary.reduce((memo, x) => {
  const [id, type, school_year, dweek, time, running, ...s ] =  x;
  if (!memo[id]) {
    memo[id] = {
      timetable: [],
    };
  }

  memo[id].id = id;
  memo[id].type = type;
  memo[id].school_year = school_year;
  memo[id].timetable.push({ dweek, time, });

  if (running) {
    memo[id].running = parseInt(running, 10);
    memo[id].mfee = s.map(y => y ? parseInt(y, 10) : null);
  }

  return memo;
}, {});


const table = $('<table class="table">').appendTo($('#container'));
const output = $('<div>').appendTo($('#container'));

const tr = $('<tr>').appendTo(table);
tr.append($('<th>').text(''));

DWEEKS.forEach(x => {
  tr.append($('<th>').text(x));
});

const selects = {};
TIMES.forEach(x => {
  const tr = $('<tr>').appendTo(table);
  tr.append($('<th>').text(x));
  DWEEKS.forEach(y => {
    const select = $('<select class="form-select">');
    select.data('frame', [y, x].join('-'));
    select.append($('<option>'));
    select.on('change', self => {
      const selecteds = Object.keys(selects).reduce((selecteds, key) => {
        const selected = $('option:selected', selects[key]);
        if (selected.data('club')) {
          selecteds.push({ club_id: selected.data('club').id, dweek: selected.data('dweek'), time: selected.data('time'), });
        }
        return selecteds;
      }, []);

      location.hash = helper.encodeHash(selecteds);
      disp();
    });
    tr.append($('<td>').append(select));
    selects[select.data('frame')] = select;
  });
});

Object.keys(club_data).forEach(club_id => {
  const club = club_data[club_id];
  club.timetable.forEach(tt => {
    const key = [tt.dweek, tt.time].join('-');
    const val = club_id;
    const select = selects[key];
    select.append($('<option>').val(val).text(`${club.id} [${club.type}]`).data({club: club, dweek: tt.dweek, time: tt.time,}));
  });
});

const redume = (selecteds) => {
  let selected;
  $('select', '#container').toArray().forEach(select => {
    const frame = $(select).data('frame');
    if ((selected = selecteds.find(x => [x.dweek, x.time].join('-') === frame))) {
      $(select).val(selected.club_id);
    }
  });
};

const disp = () => {
  output.empty();

  const selecteds = helper.decodeHash(location.hash.replace(/^#/, ''));
  const selecteds_dist = selecteds.reduce((memo, selected) => {
    if (!memo[selected.club_id]) {
      memo[selected.club_id] = [];
    }
    memo[selected.club_id].push(selected);
    return memo;
  }, {});

  const total = {
    club_len: 0,
    school_len: 0,
    event_len: 0,
    fee: 0,
    running: 0,
    zappi: 0,
  };
  
  const ol = $('<ol>').appendTo(output);
  Object.keys(selecteds_dist).forEach(club_id => {
    const selecteds = selecteds_dist[club_id];
    const club = club_data[club_id];
    const fee = club.mfee[selecteds.length - 1];
    const running = club.running;

    total[ club.type === 'クラブ' ? 'club_len' : 'school_len' ]++;
    total.event_len += selecteds.length;
    total.fee += fee;
    total.running += running;

    let output_html = `[${club.type}] ${club_id} 月謝: &#xA5;${fee}, 運営費: &#xA5;${running}`;
    if (CLUB_ZAPPI[club_id]) {
      CLUB_ZAPPI[club_id].forEach(zappi => {
        const _amount = zappi.amounts[selecteds.length - 1];
        total.zappi += _amount;
        output_html += `, ${zappi.name}: &#xA5;${_amount}`;
      });
    }

    if (club.type === 'クラブ') {
      output_html += `, <span style="color: #f00;">延長割引(${total.club_len})</span>`;
    }

    ol.append($('<li>').html(output_html));

    const ul = $('<ul>').appendTo(ol);
    selecteds.forEach(selected => {
      const { club, dweek, time, } = selected;
      ul.append($('<li>').text(`${dweek}曜日 ${time}`));
    });
  });

  output.append($('<h3>').text('合計'));
  const row = $('<ul>').appendTo(output);

  // 割引計算: ５種目以降は追加の割引無し
  let discount = 0;
  if (DISCOUNTS.length <= total.club_len) {
    discount = DISCOUNTS[DISCOUNTS.length - 1];
  } else {
    discount = DISCOUNTS[total.club_len];
  }

  row.append([
    $(`<li>`).text(`クラブ数: ${total.club_len}`),
    $(`<li>`).text(`スクール数: ${total.school_len}`),
    $(`<li>`).text(`コマ数: ${total.event_len}`),
    $(`<li>`).text(`月謝合計: ${total.fee}`),
    $(`<li>`).text(`運営費合計: ${total.running}`),
    $(`<li>`).text(`運営雑費: ${total.zappi}`),
    $(`<li style="color: #f00;">`).text(`延長割引: ${discount}`),
    $(`<li>`).text(`合計: ${total.fee + total.running + total.zappi + discount}`),
  ]);
};

$(document).ready(() => {
  const selecteds = helper.decodeHash(location.hash.replace(/^#/, ''))
  redume(selecteds);
  disp();
});
